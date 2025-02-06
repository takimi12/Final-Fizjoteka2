import { NextRequest, NextResponse } from "next/server";
import { P24, Currency, Verification } from "@ingameltd/node-przelewy24";
import Transaction from "../../../../backend/models/transactionID";
import { dbConnect } from "../../../../backend/config/dbConnect";

// Definiowanie typu PaymentStatus, który będziesz używał w frontendzie
export type PaymentStatus = {
    state: 'pending' | 'success' | 'error' | 'no_payment' | 'wrong_amount';
    amount: number;
    expectedAmount: number;
    customer: {
        email: string;
    };
    products: {
        name: string;
        price: number;
    }[];
    p24Status: {
        isExpired: boolean;
        isRejected: boolean;
        error?: string;
        lastCheckedAt: Date;
        retryCount: number;
        verificationAttempts: number;
    };
};

// Funkcja obsługująca zapytania o status płatności
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const orderId = searchParams.get('orderId');

        if (!orderId) {
            return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
        }

        await dbConnect();
        const transaction = await Transaction.findById(orderId);
        
        if (!transaction) {
            return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
        }

        const expectedAmount = transaction.products.reduce((acc: number, product: any) => acc + (Number(product.price) * Number(product.quantity)), 0);

        const POS_ID = process.env.P24_MERCHANT_ID;
        const CRC = process.env.P24_CRC_KEY;
        const API_KEY = process.env.P24_API_KEY;

        if (!POS_ID || !CRC || !API_KEY) {
            return NextResponse.json({ error: "Payment configuration missing" }, { status: 500 });
        }

        const p24 = new P24(Number(POS_ID), Number(POS_ID), API_KEY, CRC, { sandbox: true });

        let state: 'pending' | 'error' | 'no_payment' | 'wrong_amount' | 'success' = 'pending';
        let p24Status: any = {
            isExpired: false,
            isRejected: false,
            lastCheckedAt: new Date(),
            retryCount: transaction.retryCount || 0,
            verificationAttempts: transaction.verificationAttempts || 0,
            sessionId: orderId,
            orderId: transaction.p24OrderId,
            error: undefined
        };

        if (transaction.p24OrderId) {
            try {
                const verifyRequest: Verification = {
                    sessionId: orderId,
                    amount: Math.round(expectedAmount * 100),
                    currency: Currency.PLN,
                    orderId: transaction.p24OrderId
                };

                const verifyResult = await p24.verifyTransaction(verifyRequest);
                p24Status.verificationAttempts++;

                if (!verifyResult) {
                    state = 'error';
                    p24Status.isRejected = true;
                    p24Status.error = 'Transaction verification failed';
                } else {
                    state = 'success';
                }
            } catch (error) {
                state = 'error';
                p24Status.isRejected = true;
                p24Status.error = error instanceof Error ? error.message : 'Verification error';
            }
        }

        const transactionTime = transaction.createdAt?.getTime() || 0;
        const isExpired = (Date.now() - transactionTime) > 15 * 60 * 1000;

        if (isExpired && state === 'pending') {
            state = 'no_payment';
            p24Status.isExpired = true;
        }

        if (state !== 'error' && transaction.amount && transaction.amount !== expectedAmount) {
            state = 'wrong_amount';
        }

        await Transaction.findByIdAndUpdate(orderId, {
            status: state === 'success',
            paymentError: state === 'error' ? p24Status.error : undefined,
            lastChecked: new Date(),
            verificationAttempts: p24Status.verificationAttempts,
            p24Status: p24Status
        });

        const updatedTransaction = await Transaction.findById(orderId);

        return NextResponse.json({
            status: updatedTransaction?.status || false,
            state,
            p24Status,
            products: updatedTransaction?.products || transaction.products,
            customer: updatedTransaction?.customer || transaction.customer,
            amount: updatedTransaction?.amount || transaction.amount,
            expectedAmount
        });
    } catch (error) {
        console.error('General error:', error);
        return NextResponse.json({
            status: false,
            state: 'error',
            p24Status: {
                isExpired: false,
                isRejected: true,
                error: error instanceof Error ? error.message : 'Unknown error',
                lastCheckedAt: new Date(),
                retryCount: 0,
                verificationAttempts: 0
            }
        }, { status: 500 });
    }
}
