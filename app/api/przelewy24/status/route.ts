import { NextRequest, NextResponse } from "next/server";
import { P24, Currency } from "@ingameltd/node-przelewy24";
import Transaction from "../../../../backend/models/transactionID";
import { dbConnect } from "../../../../backend/config/dbConnect";

interface P24TransactionStatus {
    orderId?: number;
    error?: string;
    isExpired: boolean;
    isRejected: boolean;
    processingStatus?: 'started' | 'pending' | 'processing' | 'completed' | 'canceled' | 'error' | 'refunded';
    paymentMethod?: string;
    paymentDateTime?: Date;
    refundStatus?: 'none' | 'partial' | 'full';
    errorCode?: string;
    verificationStatus?: 'unverified' | 'verified' | 'failed';
}

export interface PaymentStatus {
    status: boolean;
    state: 'pending' | 'processing' | 'success' | 'error' | 'expired' | 'no_payment' | 
           'wrong_amount' | 'canceled' | 'refunded' | 'verification_failed';
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
    lastUpdated?: Date;
    attempts?: number;
    paymentHistory?: Array<{
        status: string;
        timestamp: Date;
        details?: string;
    }>;
}

function determinePaymentState(
    transaction: any, 
    p24Status: P24TransactionStatus, 
    expectedAmount: number
): PaymentStatus['state'] {
    if (transaction.status) {
        return 'success';
    }
    
    if (p24Status.processingStatus === 'refunded') {
        return 'refunded';
    }
    
    if (p24Status.isRejected) {
        return 'error';
    }
    
    if (p24Status.isExpired) {
        return 'expired';
    }
    
    if (p24Status.processingStatus === 'canceled') {
        return 'canceled';
    }
    
    if (p24Status.verificationStatus === 'failed') {
        return 'verification_failed';
    }
    
    if (transaction.amount && transaction.amount !== expectedAmount) {
        return 'wrong_amount';
    }
    
    if (p24Status.processingStatus === 'processing') {
        return 'processing';
    }
    
    if (!transaction.p24OrderId) {
        return 'no_payment';
    }
    
    return 'pending';
}

async function getP24TransactionDetails(p24: P24, transaction: any, orderId: string, expectedAmount: number): Promise<P24TransactionStatus> {
    let p24Status: P24TransactionStatus = {
        isExpired: false,
        isRejected: false,
        processingStatus: 'pending',
        verificationStatus: 'unverified',
        refundStatus: 'none',
    };

    if (!transaction.p24OrderId) {
        return {
            ...p24Status,
            processingStatus: 'started',
        };
    }

    try {
        // Verify the transaction
        const verifyResult = await p24.verifyTransaction({
            sessionId: orderId,
            amount: Math.round(expectedAmount * 100),
            currency: Currency.PLN,
            orderId: transaction.p24OrderId
        });

        if (verifyResult === true) {
            p24Status = {
                ...p24Status,
                orderId: transaction.p24OrderId,
                verificationStatus: 'verified',
                processingStatus: 'completed'
            };
        } else {
            p24Status = {
                ...p24Status,
                orderId: transaction.p24OrderId,
                verificationStatus: 'failed',
                error: 'Transaction verification failed',
                processingStatus: 'error'
            };
        }

        // Check if transaction has expired
        const transactionExpired = Date.now() > (transaction.createdAt?.getTime() + 15 * 60 * 1000); // 15 minutes timeout
        if (!verifyResult && transactionExpired) {
            p24Status.isExpired = true;
            p24Status.processingStatus = 'error';
        }

    } catch (p24Error) {
        console.error('Error verifying P24 transaction:', p24Error);
        p24Status = {
            ...p24Status,
            orderId: transaction.p24OrderId,
            error: p24Error instanceof Error ? p24Error.message : 'Unknown P24 error',
            errorCode: p24Error instanceof Error ? p24Error.name : 'UNKNOWN_ERROR',
            processingStatus: 'error',
            verificationStatus: 'failed'
        };
    }

    return p24Status;
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

        const p24 = new P24(Number(POS_ID), Number(POS_ID), API_KEY, CRC, {
            sandbox: true,
        });

        // Get detailed P24 transaction status
        const p24Status = await getP24TransactionDetails(p24, transaction, orderId, expectedAmount);

        // Determine payment state
        const state = determinePaymentState(transaction, p24Status, expectedAmount);

        // Create new payment history entry
        const newHistoryEntry = {
            status: state,
            timestamp: new Date(),
            details: p24Status.error || undefined
        };

        // Update transaction in database with new status and history
        await Transaction.findByIdAndUpdate(orderId, {
            $push: { paymentHistory: newHistoryEntry },
            lastUpdated: new Date(),
            $inc: { attempts: 1 }
        });

        const response: PaymentStatus = {
            status: transaction.status,
            state,
            p24Status,
            products: transaction.products,
            customer: transaction.customer,
            amount: transaction.amount,
            expectedAmount,
            lastUpdated: new Date(),
            attempts: (transaction.attempts || 0) + 1,
            paymentHistory: [...(transaction.paymentHistory || []), newHistoryEntry]
        };

        return NextResponse.json(response);

    } catch (error) {
        console.error('Error details:', error);
        return NextResponse.json(
            { 
                error: error instanceof Error ? error.message : "An unknown error occurred",
                errorCode: error instanceof Error ? error.name : 'UNKNOWN_ERROR'
            },
            { status: 500 }
        );
    }
}