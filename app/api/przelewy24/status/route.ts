import { NextRequest, NextResponse } from "next/server";
import Transaction from "../../../../backend/models/transactionID";
import { dbConnect } from "../../../../backend/config/dbConnect";

type P24TransactionStatus = {
    orderId?: number;
    error?: string;
    isExpired: boolean;
    isRejected: boolean;
    processingStatus?: string;
    paymentMethod?: string;
    paymentDateTime?: Date;
    refundStatus?: string;
    errorCode?: string;
    verificationStatus?: string;
};

async function verifyP24Transaction(orderId: string, transactionData: any, expectedAmount: number): Promise<P24TransactionStatus> {
    let p24Status: P24TransactionStatus = {
        isExpired: false,
        isRejected: false,
        processingStatus: 'pending',
        verificationStatus: 'unverified',
        refundStatus: 'none',
    };

    if (!transactionData.p24OrderId) {
        return {
            ...p24Status,
            processingStatus: 'started',
            error: 'Płatność nie została jeszcze rozpoczęta',
            errorCode: 'NO_PAYMENT_STARTED'
        };
    }

    try {
        const response = await fetch("https://secure.przelewy24.pl/api/v1/transaction/verify", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${Buffer.from(`${process.env.P24_MERCHANT_ID}:${process.env.P24_API_KEY}`).toString("base64")}`
            },
            body: JSON.stringify({
                sessionId: orderId,
                amount: Math.round(expectedAmount * 100),
                currency: "PLN",
                orderId: transactionData.p24OrderId
            })
        });

        const result = await response.json();

        if (response.ok) {
            return {
                ...p24Status,
                orderId: transactionData.p24OrderId,
                verificationStatus: 'verified',
                processingStatus: 'completed',
                error: undefined,
                errorCode: undefined
            };
        } else {
            return {
                ...p24Status,
                orderId: transactionData.p24OrderId,
                verificationStatus: 'failed',
                processingStatus: 'error',
                error: result.error || 'Błąd weryfikacji płatności',
                errorCode: result.errorCode || 'VERIFICATION_FAILED'
            };
        }
    } catch (error) {
        return {
            ...p24Status,
            orderId: transactionData.p24OrderId,
            error: 'Wystąpił błąd podczas przetwarzania płatności',
            errorCode: 'UNKNOWN_ERROR',
            processingStatus: 'error',
            verificationStatus: 'failed',
            isRejected: true
        };
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const orderId = searchParams.get('orderId');

        if (!orderId) {
            return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
        }

        await dbConnect();
        const transactionData = await Transaction.findById(orderId);

        if (!transactionData) {
            return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
        }

        const expectedAmount = transactionData.products.reduce((acc: number, product: any) => acc + (Number(product.price) * Number(product.quantity)), 0);
        const p24Status = await verifyP24Transaction(orderId, transactionData, expectedAmount);

        return NextResponse.json({
            status: transactionData.status,
            state: p24Status.verificationStatus === 'verified' ? 'success' : 'error',
            p24Status,
            products: transactionData.products,
            customer: transactionData.customer,
            amount: transactionData.amount,
            expectedAmount,
            lastUpdated: new Date()
        });
    } catch (error) {
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
}
