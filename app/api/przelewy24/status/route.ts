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
    transactionStatus?: string;
    paymentMethod?: string;
    detailedStatus?: {
        status: string;
        code: string;
        description: string;
    };
}

export interface PaymentStatus {
    status: boolean;
    state: 'pending' | 'error' | 'no_payment' | 'wrong_amount' | 'success' | 'rejected' | 'expired' | 'processing';
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
        details?: any;
    };
}

async function getDetailedP24Status(
    merchantId: string,
    apiKey: string,
    isSandbox: boolean,
    p24OrderId: number | null,
    sessionId: string,
    amount: number,
    p24: P24
): Promise<P24TransactionStatus> {
    // Jeśli brak p24OrderId, zwracamy status no_payment
    if (!p24OrderId) {
        return {
            isExpired: false,
            isRejected: false,
            errorCode: 'NO_P24_ORDER_ID',
            errorDescription: 'No payment has been initiated',
            transactionStatus: 'no_payment',
            detailedStatus: {
                status: 'NO_PAYMENT',
                code: 'NO_PAYMENT',
                description: 'Nie rozpoczęto procesu płatności'
            }
        };
    }

    try {
        // Próbujemy zweryfikować transakcję
        const verifyResult = await p24.verifyTransaction({
            sessionId,
            amount: Math.round(amount * 100),
            currency: Currency.PLN,
            orderId: p24OrderId
        });

        // Tworzymy podstawowy obiekt statusu
        const status: P24TransactionStatus = {
            orderId: p24OrderId,
            isExpired: false,
            isRejected: false,
            transactionStatus: 'pending'
        };

        // Sprawdzamy datę utworzenia transakcji (15 minut)
        const transactionDate = new Date();
        const timeDiff = Date.now() - transactionDate.getTime();
        const isExpired = timeDiff > 15 * 60 * 1000;

        if (isExpired) {
            status.isExpired = true;
            status.errorCode = 'EXPIRED';
            status.errorDescription = 'Payment session expired';
            status.transactionStatus = 'expired';
            status.detailedStatus = {
                status: 'EXPIRED',
                code: 'EXPIRED',
                description: 'Sesja płatności wygasła'
            };
            return status;
        }

        if (verifyResult === true) {
            status.transactionStatus = 'success';
            status.detailedStatus = {
                status: 'SUCCESS',
                code: 'SUCCESS',
                description: 'Płatność została zrealizowana pomyślnie'
            };
            return status;
        }

        // Spróbujmy uzyskać więcej informacji o statusie transakcji
        const baseApiUrl = isSandbox ? 
            'https://sandbox.przelewy24.pl' : 
            'https://secure.przelewy24.pl';

        const credentials = Buffer.from(`${merchantId}:${apiKey}`).toString('base64');
        
        const response = await fetch(`${baseApiUrl}/api/v1/transaction/by/sessionId/${sessionId}`, {
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const transactionDetails = await response.json();
            
            status.detailedStatus = {
                status: transactionDetails.status || 'PENDING',
                code: transactionDetails.code || 'UNKNOWN',
                description: getStatusDescription(transactionDetails.status)
            };

            status.transactionStatus = transactionDetails.status?.toLowerCase() || 'pending';

            if (transactionDetails.status === 'REJECTED') {
                status.isRejected = true;
                status.errorCode = 'REJECTED';
                status.errorDescription = 'Payment was rejected';
            }
        }

        return status;

    } catch (error) {
        return {
            isExpired: false,
            isRejected: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            errorCode: 'P24_API_ERROR',
            errorDescription: 'Could not retrieve payment status',
            transactionStatus: 'error',
            detailedStatus: {
                status: 'ERROR',
                code: 'ERROR',
                description: 'Wystąpił błąd podczas sprawdzania statusu płatności'
            }
        };
    }
}

function getStatusDescription(status: string): string {
    const statusMap: { [key: string]: string } = {
        'PENDING': 'Płatność w trakcie przetwarzania',
        'SUCCESS': 'Płatność potwierdzona',
        'CANCELED': 'Płatność anulowana przez użytkownika',
        'ERROR': 'Wystąpił błąd podczas przetwarzania płatności',
        'EXPIRED': 'Sesja płatności wygasła',
        'REJECTED': 'Płatność odrzucona',
        'PROCESSING': 'Przetwarzanie płatności',
    };
    return statusMap[status] || 'Nieznany status płatności';
}

function determinePaymentState(
    transaction: any,
    p24Status: P24TransactionStatus,
    expectedAmount: number
): PaymentStatus['state'] {
    // Sprawdzamy czy płatność została zainicjowana
    if (!transaction.p24OrderId) {
        return 'no_payment';
    }

    // Sprawdzamy czy transakcja jest zakończona sukcesem
    if (p24Status.transactionStatus === 'success') {
        return 'success';
    }

    // Sprawdzamy pozostałe stany
    if (p24Status.isExpired) return 'expired';
    if (p24Status.isRejected) return 'rejected';
    if (p24Status.error) return 'error';
    if (p24Status.transactionStatus === 'processing') return 'processing';
    if (transaction.amount && transaction.amount !== expectedAmount) return 'wrong_amount';
    
    return 'pending';
}

function getErrorDetails(
    state: PaymentStatus['state'],
    p24Status: P24TransactionStatus,
    transaction: any,
    expectedAmount: number
): PaymentStatus['errorDetails'] | undefined {
    switch (state) {
        case 'expired':
            return {
                code: 'PAYMENT_EXPIRED',
                message: 'Sesja płatności wygasła',
                timestamp: new Date().toISOString(),
                details: p24Status.detailedStatus
            };
        case 'rejected':
            return {
                code: 'PAYMENT_REJECTED',
                message: p24Status.errorDescription || 'Płatność została odrzucona',
                timestamp: new Date().toISOString(),
                details: p24Status.detailedStatus
            };
        case 'error':
            return {
                code: p24Status.errorCode || 'UNKNOWN_ERROR',
                message: p24Status.errorDescription || 'Wystąpił nieznany błąd',
                timestamp: new Date().toISOString(),
                details: p24Status.detailedStatus
            };
        case 'wrong_amount':
            return {
                code: 'WRONG_AMOUNT',
                message: `Oczekiwana kwota: ${expectedAmount} PLN, otrzymano: ${transaction.amount} PLN`,
                timestamp: new Date().toISOString()
            };
        case 'no_payment':
            return {
                code: 'NO_PAYMENT',
                message: 'Nie rozpoczęto procesu płatności',
                timestamp: new Date().toISOString(),
                details: p24Status.detailedStatus
            };
        default:
            return undefined;
    }
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
        const IS_SANDBOX = process.env.P24_SANDBOX === 'true';

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
            sandbox: IS_SANDBOX,
        });

        const p24Status = await getDetailedP24Status(
            POS_ID,
            API_KEY,
            IS_SANDBOX,
            transaction.p24OrderId || null,
            orderId,
            expectedAmount,
            p24
        );

        const state = determinePaymentState(transaction, p24Status, expectedAmount);
        const errorDetails = getErrorDetails(state, p24Status, transaction, expectedAmount);

        // Aktualizujemy status transakcji w bazie danych, jeśli płatność jest zakończona sukcesem
        if (state === 'success' && !transaction.status) {
            transaction.status = true;
            await transaction.save();
        }

        const response: PaymentStatus = {
            status: transaction.status || false,
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
                    message: error instanceof Error ? error.message : "Wystąpił nieznany błąd systemowy",
                    timestamp: new Date().toISOString()
                }
            },
            { status: 500 }
        );
    }
}