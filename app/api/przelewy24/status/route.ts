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

// Funkcja do pobierania statusu transakcji bezpośrednio z Przelewy24
const checkTransactionStatus = async (orderId: string) => {
    const response = await fetch("https://secure.przelewy24.pl/api/v1/transaction/by/sessionId", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${Buffer.from(`${process.env.P24_MERCHANT_ID}:${process.env.P24_API_KEY}`).toString("base64")}`
        },
        body: JSON.stringify({
            sessionId: orderId
        })
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch transaction status: ${response.statusText}`);
    }

    return response.json();
};

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

        let p24Status: P24TransactionStatus = {
            isExpired: false,
            isRejected: false
        };

        // Pobranie statusu transakcji z Przelewy24
        let transactionInfo;
        try {
            transactionInfo = await checkTransactionStatus(orderId);
            console.log("Transaction Info from P24:", transactionInfo);
        } catch (error) {
            console.error("Error fetching P24 transaction status:", error);
            p24Status.error = error instanceof Error ? error.message : "Unknown P24 error";
        }

        // Określanie stanu płatności na podstawie statusu z Przelewy24
        let state: PaymentStatus['state'] = 'pending';

        if (transactionInfo?.data?.status === 1) {
            state = 'success';
        } else if (transactionInfo?.data?.status === 2) {
            state = 'error';
            p24Status.isRejected = true;
        } else if (transactionInfo?.data?.status === 3) {
            state = 'no_payment';
            p24Status.isExpired = true;
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
