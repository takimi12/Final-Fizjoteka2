// import { NextRequest, NextResponse } from "next/server";
// import Transaction from "../../../../backend/models/transactionID";
// import { dbConnect } from "../../../../backend/config/dbConnect";

// export enum PaymentStatus {
//     PENDING = "PENDING",           // Oczekiwanie na wpłatę
//     SUCCESS = "SUCCESS",           // Płatność zakończona
//     ERROR = "ERROR",              // Błąd płatności
//     NO_PAYMENT = "NO_PAYMENT",     // Brak wpłaty
//     WRONG_AMOUNT = "WRONG_AMOUNT", // Nieprawidłowa kwota
//     EXPIRED = "EXPIRED"           // Sesja wygasła
// }

// interface TransactionResponse {
//     status: PaymentStatus;
//     products: Array<{
//         name: string;
//         url: string;
//         price: number;
//     }>;
//     customer: {
//         email: string;
//     };
//     originalAmount?: number;
//     paidAmount?: number;
//     sessionId?: string;
// }

// export async function GET(request: NextRequest) {
//     try {
//         const { searchParams } = new URL(request.url);
//         const orderId = searchParams.get('orderId');

//         if (!orderId) {
//             return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
//         }

//         await dbConnect();
        
//         const transaction = await Transaction.findById(orderId);
        
//         if (!transaction) {
//             return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
//         }

//         // Tutaj możesz dodać logikę sprawdzającą status w P24 jeśli potrzebne
//         const response: TransactionResponse = {
//             status: transaction.status ? PaymentStatus.SUCCESS : PaymentStatus.PENDING,
//             products: transaction.products,
//             customer: transaction.customer,
//             sessionId: transaction._id.toString()
//         };

//         return NextResponse.json(response);
//     } catch (error) {
//         console.error('Error fetching transaction status:', error);
//         return NextResponse.json(
//             { error: error instanceof Error ? error.message : "An unknown error occurred" },
//             { status: 500 }
//         );
//     }
// }
// app/api/przelewy24/status/route.ts
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

        try {
            await dbConnect();
        } catch (dbError) {
            console.error('Database connection error:', dbError);
            return NextResponse.json(
                { error: "Database connection failed" },
                { status: 500 }
            );
        }
        
        const transaction = await Transaction.findById(orderId);
        
        if (!transaction) {
            return NextResponse.json(
                { error: "Transaction not found" }, 
                { status: 404 }
            );
        }

        // Obliczanie oczekiwanej kwoty
        const expectedAmount = transaction.products.reduce((acc:any, product:any) => 
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

        if (transaction.p24OrderId) {
            try {
                // Poprawione parametry verifyTransaction zgodnie z interfejsem
                const verifyResult = await p24.verifyTransaction({
                    sessionId: orderId,
                    amount: Math.round(expectedAmount * 100),
                    currency: Currency.PLN,
                    orderId: transaction.p24OrderId
                });

                p24Status = {
                    orderId: transaction.p24OrderId,
                    isExpired: !verifyResult && Date.now() > (transaction.createdAt?.getTime() + 15 * 60 * 1000),
                    isRejected: !verifyResult,
                    error: verifyResult ? undefined : 'Transaction verification failed'
                };
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