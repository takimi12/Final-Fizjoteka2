import { NextRequest, NextResponse } from "next/server";
import Transaction from "../../../../backend/models/transactionID";
import { dbConnect } from "../../../../backend/config/dbConnect";
import crypto from "crypto";

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

        const expectedAmount = transaction.products.reduce((acc:any, product:any) => 
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

        let p24Status: { isExpired: boolean; isRejected: boolean; error?: string } = {
            isExpired: false,
            isRejected: false
        };

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

                const verifyResult = await response.json();

                if (!verifyResult || !verifyResult.data || verifyResult.data.status !== "success") {
                    p24Status.isRejected = true;
                    p24Status.error = 'Transaction verification failed';
                }

                const transactionExpired = Date.now() > (transaction.createdAt?.getTime() + 2 * 60 * 1000);
                if (!verifyResult && transactionExpired) {
                    p24Status.isExpired = true;
                }
            } catch (error) {
                console.error('Error verifying P24 transaction:', error);
                p24Status.error = error instanceof Error ? error.message : 'Unknown P24 error';
            }
        }

        let state = 'pending';
        if (transaction.status) {
            state = 'success';
        } else if (p24Status.isRejected) {
            state = 'error';
        } else if (p24Status.isExpired) {
            state = 'no_payment';
        } else if (p24Status.error) {
            state = 'error';
        } else if (transaction.amount && transaction.amount !== expectedAmount) {
            state = 'wrong_amount';
        }

        const response = {
            status: transaction.status,
            state,
            p24Status,
            products: transaction.products,
            customer: transaction.customer,
            amount: transaction.amount,
            expectedAmount
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error('Error details:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "An unknown error occurred" },
            { status: 500 }
        );
    }
}
