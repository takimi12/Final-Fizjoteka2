import { NextRequest, NextResponse } from "next/server";
import Transaction from "../../../../backend/models/transactionID";
import { dbConnect } from "../../../../backend/config/dbConnect";
import crypto from "crypto";

// Typy dla statusów i przyczyn odrzucenia
type TransactionState = 
    | 'success' 
    | 'pending' 
    | 'insufficient_funds'
    | 'limit_exceeded'
    | 'card_expired'
    | 'user_cancelled'
    | 'expired'
    | 'verification_error'
    | 'wrong_amount'
    | 'system_error'
    | 'other';

type P24TransactionStatus = 
    | 'pending'
    | 'success'
    | 'failure'
    | 'waiting'
    | 'cancelled';

interface P24Status {
    isExpired: boolean;
    isRejected: boolean;
    error?: string;
    rejectReason?: string;
}

interface P24VerifyResult {
    data?: {
        status: P24TransactionStatus;
        errorCode?: string;
        errorMessage?: string;
    };
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const orderId = searchParams.get('orderId');

        if (!orderId) {
            return NextResponse.json(
                { error: "Order ID is required" }, 
                { status: 400 }
            );
        }

        await dbConnect();
        
        const transaction = await Transaction.findById(orderId);
        
        if (!transaction) {
            return NextResponse.json(
                { error: "Transaction not found" }, 
                { status: 404 }
            );
        }

        const expectedAmount = transaction.products.reduce((acc: number, product: any) => 
            acc + (Number(product.price) * Number(product.quantity)), 0
        );

        const POS_ID = process.env.P24_MERCHANT_ID;
        const CRC = process.env.P24_CRC_KEY;
        const API_KEY = process.env.P24_API_KEY;

        if (!POS_ID || !CRC || !API_KEY) {
            console.error('Missing P24 configuration');
            return NextResponse.json(
                { error: "Payment configuration missing" },
                { status: 500 }
            );
        }

        let p24Status: P24Status = {
            isExpired: false,
            isRejected: false
        };

        let p24TransactionStatus: P24TransactionStatus = "pending";
        let state: TransactionState = 'pending';
        let rejectReason = "";

        if (transaction.p24OrderId) {
            try {
                const signData = `${POS_ID}|${transaction.p24OrderId}|${Math.round(expectedAmount * 100)}|PLN|${CRC}`;
                const sign = crypto.createHash('sha384').update(signData).digest('hex');

                const response = await fetch('https://secure.przelewy24.pl/api/v1/transaction/verify', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${API_KEY}`
                    },
                    body: JSON.stringify({
                        merchantId: Number(POS_ID),
                        posId: Number(POS_ID),
                        sessionId: orderId,
                        amount: Math.round(expectedAmount * 100),
                        currency: "PLN",
                        orderId: transaction.p24OrderId,
                        sign: sign
                    })
                });

                const verifyResult: P24VerifyResult = await response.json();
                p24TransactionStatus = verifyResult?.data?.status || "pending";
                const errorCode = verifyResult?.data?.errorCode;
                const errorMessage = verifyResult?.data?.errorMessage;

                if (p24TransactionStatus === "failure" || p24TransactionStatus === "cancelled") {
                    p24Status.isRejected = true;
                    
                    // Mapowanie kodów błędów na zrozumiałe komunikaty
                    switch (errorCode) {
                        case "err1":
                            rejectReason = "insufficient_funds";
                            p24Status.error = "Insufficient funds in account";
                            break;
                        case "err2":
                            rejectReason = "limit_exceeded";
                            p24Status.error = "Transaction limit exceeded";
                            break;
                        case "err3":
                            rejectReason = "card_expired";
                            p24Status.error = "Payment card expired";
                            break;
                        case "err4":
                            rejectReason = "user_cancelled";
                            p24Status.error = "Transaction cancelled by user";
                            break;
                        default:
                            rejectReason = "other";
                            p24Status.error = errorMessage || "Transaction was rejected or cancelled";
                    }
                    
                    p24Status.rejectReason = rejectReason;
                } else if (p24TransactionStatus !== "success" && p24TransactionStatus !== "waiting") {
                    p24Status.error = `Unexpected status: ${p24TransactionStatus}`;
                    rejectReason = "unexpected_status";
                }

                // Sprawdzanie czy transakcja nie wygasła (po 2 minutach)
                const transactionExpired = Date.now() > (transaction.createdAt?.getTime() + 2 * 60 * 1000);
                if (p24TransactionStatus === "pending" && transactionExpired) {
                    p24Status.isExpired = true;
                    rejectReason = "expired";
                }
            } catch (error) {
                console.error('Error verifying P24 transaction:', error);
                p24Status.error = error instanceof Error ? error.message : 'Unknown P24 error';
                rejectReason = "verification_error";
            }
        }

        // Określanie końcowego stanu transakcji
        if (transaction.status) {
            state = 'success';
        } else if (p24Status.isRejected) {
            state = rejectReason as TransactionState || 'other';
        } else if (p24Status.isExpired) {
            state = 'expired';
        } else if (p24TransactionStatus === "failure" || p24TransactionStatus === "cancelled") {
            state = rejectReason as TransactionState || 'other';
        } else if (p24TransactionStatus === "waiting") {
            state = 'pending';
        } else if (transaction.amount && transaction.amount !== expectedAmount) {
            state = 'wrong_amount';
        }

        // Przygotowanie odpowiedzi
        const response = {
            status: transaction.status,
            state,
            p24Status,
            p24TransactionStatus,
            rejectReason,
            products: transaction.products,
            customer: transaction.customer,
            amount: transaction.amount,
            expectedAmount,
            lastVerification: new Date().toISOString()
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error('Error details:', error);
        return NextResponse.json(
            { 
                error: error instanceof Error ? error.message : "An unknown error occurred",
                state: 'system_error' as TransactionState,
                rejectReason: 'system_error'
            },
            { status: 500 }
        );
    }
}