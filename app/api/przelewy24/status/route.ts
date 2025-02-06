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
import { NextRequest, NextResponse } from "next/server";
import Transaction from "../../../../backend/models/transactionID";
import { dbConnect } from "../../../../backend/config/dbConnect";

export type PaymentStatus = {
    status: boolean;
    state: 'pending' | 'error' | 'no_payment' | 'wrong_amount' | 'success';
    products: Array<{
        name: string;
        url: string;
        price: number;
    }>;
    customer: {
        email: string;
    };
    amount?: number;
    expectedAmount?: number;
};

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

        const expectedAmount = transaction.products.reduce((acc:any, product:any) => acc + Number(product.price), 0);

        const response: PaymentStatus = {
            status: transaction.status,
            state: transaction.status ? 'success' : 'pending',
            products: transaction.products,
            customer: transaction.customer,
            expectedAmount
        };

        // Tutaj możesz dodać logikę sprawdzającą różne stany na podstawie danych z P24
        // Przykład:
        if (transaction.p24Error) {
            response.state = 'error';
        } else if (transaction.amount && transaction.amount !== expectedAmount) {
            response.state = 'wrong_amount';
            response.amount = transaction.amount;
        } else if (transaction.paymentExpired) {
            response.state = 'no_payment';
        }

        return NextResponse.json(response);
    } catch (error) {
        console.error('Error fetching transaction status:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "An unknown error occurred" },
            { status: 500 }
        );
    }
}