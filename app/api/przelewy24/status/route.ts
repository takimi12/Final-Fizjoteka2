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
                { error: "Payment configuration missing" },
                { status: 500 }
            );
        }

        const p24 = new P24(Number(POS_ID), Number(POS_ID), API_KEY, CRC, {
            sandbox: true,
        });

        let state: PaymentStatus['state'] = 'pending';
        let p24Status: P24TransactionStatus = {
            isExpired: false,
            isRejected: false
        };

        // Sprawdzanie statusu płatności
        if (transaction.p24OrderId) {
            try {
                // Próba weryfikacji transakcji
                try {
                    const verifyResult = await p24.verifyTransaction({
                        sessionId: orderId,
                        amount: Math.round(expectedAmount * 100),
                        currency: Currency.PLN,
                        orderId: transaction.p24OrderId
                    });

                    // Jeśli weryfikacja się nie powiodła
                    if (!verifyResult) {
                        state = 'error';
                        p24Status.isRejected = true;
                        p24Status.error = 'Transaction verification failed';
                        
                        // Aktualizuj transakcję w bazie danych
                        await Transaction.findByIdAndUpdate(orderId, {
                            status: false,
                            paymentError: 'Transaction verification failed',
                            lastChecked: new Date()
                        });
                    } else {
                        // Jeśli weryfikacja się powiodła
                        state = 'success';
                        await Transaction.findByIdAndUpdate(orderId, {
                            status: true,
                            lastChecked: new Date()
                        });
                    }
                } catch (verifyError) {
                    // Błąd podczas weryfikacji
                    state = 'error';
                    p24Status.isRejected = true;
                    p24Status.error = verifyError instanceof Error ? verifyError.message : 'Verification error';
                    
                    await Transaction.findByIdAndUpdate(orderId, {
                        status: false,
                        paymentError: verifyError instanceof Error ? verifyError.message : 'Verification error',
                        lastChecked: new Date()
                    });
                }
            } catch (p24Error) {
                console.error('P24 Error:', p24Error);
                state = 'error';
                p24Status.error = p24Error instanceof Error ? p24Error.message : 'Unknown P24 error';
                
                await Transaction.findByIdAndUpdate(orderId, {
                    status: false,
                    paymentError: p24Error instanceof Error ? p24Error.message : 'Unknown P24 error',
                    lastChecked: new Date()
                });
            }
        }

        // Sprawdź czy transakcja nie wygasła
        const transactionTime = transaction.createdAt?.getTime() || 0;
        const timePassed = Date.now() - transactionTime;
        const isExpired = timePassed > 15 * 60 * 1000; // 15 minut

        if (isExpired && state === 'pending') {
            state = 'no_payment';
            p24Status.isExpired = true;
            
            await Transaction.findByIdAndUpdate(orderId, {
                status: false,
                paymentError: 'Transaction expired',
                lastChecked: new Date()
            });
        }

        // Sprawdź kwotę tylko jeśli transakcja nie jest w stanie błędu
        if (state !== 'error' && transaction.amount && transaction.amount !== expectedAmount) {
            state = 'wrong_amount';
            
            await Transaction.findByIdAndUpdate(orderId, {
                status: false,
                paymentError: 'Wrong amount',
                lastChecked: new Date()
            });
        }

        // Pobierz zaktualizowaną transakcję
        const updatedTransaction = await Transaction.findById(orderId);

        const response: PaymentStatus = {
            status: updatedTransaction?.status || false,
            state,
            p24Status,
            products: updatedTransaction?.products || transaction.products,
            customer: updatedTransaction?.customer || transaction.customer,
            amount: updatedTransaction?.amount || transaction.amount,
            expectedAmount
        };

        return NextResponse.json(response);

    } catch (error) {
        console.error('General error:', error);
        return NextResponse.json(
            { 
                status: false,
                state: 'error',
                p24Status: {
                    isExpired: false,
                    isRejected: true,
                    error: error instanceof Error ? error.message : 'Unknown error'
                }
            },
            { status: 500 }
        );
    }
}