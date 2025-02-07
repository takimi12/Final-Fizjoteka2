

import { NextRequest, NextResponse } from "next/server";
import { P24, Currency } from "@ingameltd/node-przelewy24";
import Transaction from "../../../../backend/models/transactionID";
import { dbConnect } from "../../../../backend/config/dbConnect";

interface P24TransactionStatus {
    orderId?: number;
    error?: string;
    isExpired: boolean;
    isRejected: boolean;
}

export interface PaymentStatus {
    status: boolean;
    state: 'pending' | 'error' | 'no_payment' | 'wrong_amount' | 'success';
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
        console.log("Transaction:", transaction);
        if (!transaction) {
            return NextResponse.json(
                { error: "Transaction not found" }, 
                { status: 404 }
            );
        }

        // Obliczanie oczekiwanej kwoty
        const expectedAmount = transaction.products.reduce((acc: any, product: any) => 
            acc + (Number(product.price) * Number(product.quantity)), 0
        );

        // Inicjalizacja P24
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

        // Sprawdzanie statusu w P24
        let p24Status: P24TransactionStatus = {
            isExpired: false,
            isRejected: false
        };
        console.log("P24 Status:", p24Status);

        if (transaction.p24OrderId) {
            try {
                // Weryfikacja transakcji w Przelewy24
                const verifyResult = await p24.verifyTransaction({
                    sessionId: orderId,
                    amount: Math.round(expectedAmount * 100),
                    currency: Currency.PLN,
                    orderId: transaction.p24OrderId
                });

                // Jeśli weryfikacja nie powiodła się, oznacza to błąd
                if (!verifyResult) {
                    p24Status.isRejected = true;
                    p24Status.error = 'Transaction verification failed';
                }

                // Sprawdzenie, czy transakcja wygasła (np. po 15 minutach)
                const transactionExpired = Date.now() > (transaction.createdAt?.getTime() + 15 * 60 * 1000);
                if (!verifyResult && transactionExpired) {
                    p24Status.isExpired = true;
                }

            } catch (p24Error) {
                console.error('Error verifying P24 transaction:', p24Error);
                p24Status.error = p24Error instanceof Error ? p24Error.message : 'Unknown P24 error';
            }
        }

        // Określanie stanu płatności
        let state: PaymentStatus['state'] = 'pending';

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

        const response: PaymentStatus = {
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
            { 
                error: error instanceof Error ? error.message : "An unknown error occurred" 
            },
            { status: 500 }
        );
    }
}