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

async function getP24TransactionDetails(
    p24: P24, 
    transactionData: any, 
    orderId: string, 
    expectedAmount: number
): Promise<P24TransactionStatus> {
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
        const verifyResult = await p24.verifyTransaction({
            sessionId: orderId,
            amount: Math.round(expectedAmount * 100),
            currency: Currency.PLN,
            orderId: transactionData.p24OrderId
        });

        if (verifyResult === true) {
            p24Status = {
                ...p24Status,
                orderId: transactionData.p24OrderId,
                verificationStatus: 'verified',
                processingStatus: 'completed',
                error: undefined,
                errorCode: undefined
            };
        } else {
            const transactionExpired = Date.now() > (transactionData.createdAt?.getTime() + 15 * 60 * 1000);
            
            if (transactionExpired) {
                p24Status = {
                    ...p24Status,
                    orderId: transactionData.p24OrderId,
                    isExpired: true,
                    verificationStatus: 'failed',
                    processingStatus: 'error',
                    error: 'Sesja płatności wygasła. Prosimy spróbować ponownie.',
                    errorCode: 'SESSION_EXPIRED'
                };
            } else if (transactionData.amount && transactionData.amount !== expectedAmount) {
                p24Status = {
                    ...p24Status,
                    orderId: transactionData.p24OrderId,
                    verificationStatus: 'failed',
                    processingStatus: 'error',
                    error: `Nieprawidłowa kwota płatności. Oczekiwano: ${expectedAmount} PLN, otrzymano: ${transactionData.amount} PLN`,
                    errorCode: 'WRONG_AMOUNT'
                };
            } else {
                p24Status = {
                    ...p24Status,
                    orderId: transactionData.p24OrderId,
                    verificationStatus: 'failed',
                    processingStatus: 'error',
                    error: 'Weryfikacja płatności nie powiodła się. Prosimy spróbować ponownie lub skontaktować się z obsługą.',
                    errorCode: 'VERIFICATION_FAILED'
                };
            }
        }

    } catch (p24Error: any) {
        let errorMessage = 'Wystąpił błąd podczas przetwarzania płatności.';
        let errorCode = 'UNKNOWN_ERROR';

        if (p24Error.code) {
            switch (p24Error.code) {
                case 'err51':
                    errorMessage = 'Nieprawidłowa kwota transakcji';
                    errorCode = 'INVALID_AMOUNT';
                    break;
                case 'err4':
                    errorMessage = 'Nieprawidłowy identyfikator transakcji';
                    errorCode = 'INVALID_TRANSACTION_ID';
                    break;
                case 'err6':
                    errorMessage = 'Transakcja anulowana przez użytkownika';
                    errorCode = 'TRANSACTION_CANCELED';
                    break;
                case 'err7':
                    errorMessage = 'Transakcja odrzucona przez bank';
                    errorCode = 'BANK_REJECTION';
                    break;
            }
        }

        p24Status = {
            ...p24Status,
            orderId: transactionData.p24OrderId,
            error: errorMessage,
            errorCode: errorCode,
            processingStatus: 'error',
            verificationStatus: 'failed',
            isRejected: true
        };
    }

    return p24Status;
}

function determinePaymentState(
    transactionData: any, 
    p24Status: P24TransactionStatus, 
    expectedAmount: number
): PaymentStatus['state'] {
    if (transactionData.status) {
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
    
    if (transactionData.amount && transactionData.amount !== expectedAmount) {
        return 'wrong_amount';
    }
    
    if (p24Status.processingStatus === 'processing') {
        return 'processing';
    }
    
    if (!transactionData.p24OrderId) {
        return 'no_payment';
    }
    
    return 'pending';
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
        
        const transactionData = await Transaction.findById(orderId);
        
        if (!transactionData) {
            return NextResponse.json(
                { error: "Transaction not found" }, 
                { status: 404 }
            );
        }

        const expectedAmount = transactionData.products.reduce((acc: number, product: any) => 
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

        const p24Status = await getP24TransactionDetails(p24, transactionData, orderId, expectedAmount);
        const state = determinePaymentState(transactionData, p24Status, expectedAmount);

        const newHistoryEntry = {
            status: state,
            timestamp: new Date(),
            details: p24Status.error
        };

        await Transaction.findByIdAndUpdate(orderId, {
            $push: { paymentHistory: newHistoryEntry },
            lastUpdated: new Date(),
            $inc: { attempts: 1 }
        });

        const response: PaymentStatus = {
            status: transactionData.status,
            state: state,
            p24Status: p24Status,
            products: transactionData.products,
            customer: transactionData.customer,
            amount: transactionData.amount,
            expectedAmount: expectedAmount,
            lastUpdated: new Date(),
            attempts: (transactionData.attempts || 0) + 1,
            paymentHistory: [...(transactionData.paymentHistory || []), newHistoryEntry]
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