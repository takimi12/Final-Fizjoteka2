import { NextRequest, NextResponse } from "next/server";
import { P24, Currency } from "@ingameltd/node-przelewy24";
import Transaction from "../../../../backend/models/transactionID";
import { dbConnect } from "../../../../backend/config/dbConnect";

interface P24TransactionStatus {
    orderId?: number;
    error?: string;
    isExpired: boolean;
    isRejected: boolean;
    errorCode?: string;
    errorDescription?: string;
}

export interface PaymentStatus {
    status: boolean;
    state: 'pending' | 'error' | 'no_payment' | 'wrong_amount' | 'success' | 'rejected' | 'expired';
    p24Status: P24TransactionStatus;
    products: Array<{
        name: string;
        price: number;
        quantity: number;
        url: string;
        _id: string;
    }>;
    customer: {
        email: string;
        nameAndSurname: string;
        companyName: string;
        nip: string;
        _id: string;
    };
    amount?: number;
    expectedAmount?: number;
    errorDetails?: {
        code: string;
        message: string;
        timestamp: string;
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
            return NextResponse.json(
                { 
                    status: false,
                    state: 'error',
                    errorDetails: {
                        code: 'CONFIG_ERROR',
                        message: 'Payment configuration missing',
                        timestamp: new Date().toISOString()
                    }
                },
                { status: 500 }
            );
        }

        const p24 = new P24(Number(POS_ID), Number(POS_ID), API_KEY, CRC, {
            sandbox: true,
        });

        let p24Status: P24TransactionStatus = {
            isExpired: false,
            isRejected: false
        };

        // Sprawdzanie statusu w P24
        if (transaction.p24OrderId) {
            try {
                const verifyResult = await p24.verifyTransaction({
                    sessionId: orderId,
                    amount: Math.round(expectedAmount * 100),
                    currency: Currency.PLN,
                    orderId: transaction.p24OrderId
                });

                // Sprawdzenie czasu wygaśnięcia (15 minut)
                const transactionExpired = Date.now() > (transaction.createdAt?.getTime() + 15 * 60 * 1000);

                if (!verifyResult) {
                    if (transactionExpired) {
                        p24Status.isExpired = true;
                        p24Status.errorCode = 'EXPIRED';
                        p24Status.errorDescription = 'Transaction time limit exceeded';
                    } else {
                        p24Status.isRejected = true;
                        p24Status.errorCode = 'REJECTED';
                        p24Status.errorDescription = 'Payment was rejected';
                    }
                }
            } catch (p24Error) {
                p24Status.error = p24Error instanceof Error ? p24Error.message : 'Unknown P24 error';
                p24Status.errorCode = 'P24_ERROR';
                p24Status.errorDescription = p24Error instanceof Error ? p24Error.message : 'Unknown payment processing error';
            }
        }

        // Określanie dokładnego stanu płatności
        let state: PaymentStatus['state'] = 'pending';
        let errorDetails = undefined;

        if (transaction.status) {
            state = 'success';
        } else if (p24Status.isExpired) {
            state = 'expired';
            errorDetails = {
                code: 'PAYMENT_EXPIRED',
                message: 'Payment session has expired',
                timestamp: new Date().toISOString()
            };
        } else if (p24Status.isRejected) {
            state = 'rejected';
            errorDetails = {
                code: 'PAYMENT_REJECTED',
                message: 'Payment was rejected by the payment provider',
                timestamp: new Date().toISOString()
            };
        } else if (p24Status.error) {
            state = 'error';
            errorDetails = {
                code: p24Status.errorCode || 'UNKNOWN_ERROR',
                message: p24Status.errorDescription || 'Unknown error occurred',
                timestamp: new Date().toISOString()
            };
        } else if (transaction.amount && transaction.amount !== expectedAmount) {
            state = 'wrong_amount';
            errorDetails = {
                code: 'WRONG_AMOUNT',
                message: `Expected ${expectedAmount} but received ${transaction.amount}`,
                timestamp: new Date().toISOString()
            };
        }

        const response: PaymentStatus = {
            status: transaction.status,
            state,
            p24Status,
            products: transaction.products,
            customer: transaction.customer,
            amount: transaction.amount,
            expectedAmount,
            ...(errorDetails && { errorDetails })
        };

        return NextResponse.json(response);

    } catch (error) {
        return NextResponse.json(
            { 
                status: false,
                state: 'error',
                errorDetails: {
                    code: 'SYSTEM_ERROR',
                    message: error instanceof Error ? error.message : "An unknown error occurred",
                    timestamp: new Date().toISOString()
                }
            },
            { status: 500 }
        );
    }
}