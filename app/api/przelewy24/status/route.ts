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


// import { NextRequest, NextResponse } from "next/server";
// import Transaction from "../../../../backend/models/transactionID";
// import { dbConnect } from "../../../../backend/config/dbConnect";
// import crypto from "crypto";

// // Typy dla statusów i przyczyn odrzucenia
// type TransactionState = 
//     | 'success' 
//     | 'pending' 
//     | 'insufficient_funds'
//     | 'limit_exceeded'
//     | 'card_expired'
//     | 'user_cancelled'
//     | 'expired'
//     | 'verification_error'
//     | 'wrong_amount'
//     | 'system_error'
//     | 'other';

// type P24TransactionStatus = 
//     | 'pending'
//     | 'success'
//     | 'failure'
//     | 'waiting'
//     | 'cancelled';

// interface P24Status {
//     isExpired: boolean;
//     isRejected: boolean;
//     error?: string;
//     rejectReason?: string;
// }

// interface P24VerifyResult {
//     data?: {
//         status: P24TransactionStatus;
//         errorCode?: string;
//         errorMessage?: string;
//     };
// }

// export async function GET(request: NextRequest) {
//     try {
//         const { searchParams } = new URL(request.url);
//         const orderId = searchParams.get('orderId');

//         if (!orderId) {
//             return NextResponse.json(
//                 { error: "Order ID is required" }, 
//                 { status: 400 }
//             );
//         }

//         await dbConnect();
        
//         const transaction = await Transaction.findById(orderId);
        
//         if (!transaction) {
//             return NextResponse.json(
//                 { error: "Transaction not found" }, 
//                 { status: 404 }
//             );
//         }

//         const expectedAmount = transaction.products.reduce((acc: number, product: any) => 
//             acc + (Number(product.price) * Number(product.quantity)), 0
//         );

//         const POS_ID = process.env.P24_MERCHANT_ID;
//         const CRC = process.env.P24_CRC_KEY;
//         const API_KEY = process.env.P24_API_KEY;

//         if (!POS_ID || !CRC || !API_KEY) {
//             console.error('Missing P24 configuration');
//             return NextResponse.json(
//                 { error: "Payment configuration missing" },
//                 { status: 500 }
//             );
//         }

//         let p24Status: P24Status = {
//             isExpired: false,
//             isRejected: false
//         };

//         let p24TransactionStatus: P24TransactionStatus = "pending";
//         let state: TransactionState = 'pending';
//         let rejectReason = "";

//         if (transaction.p24OrderId) {
//             try {
//                 const signData = `${POS_ID}|${transaction.p24OrderId}|${Math.round(expectedAmount * 100)}|PLN|${CRC}`;
//                 const sign = crypto.createHash('sha384').update(signData).digest('hex');

//                 const response = await fetch('https://secure.przelewy24.pl/api/v1/transaction/verify', {
//                     method: 'PUT',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${API_KEY}`
//                     },
//                     body: JSON.stringify({
//                         merchantId: Number(POS_ID),
//                         posId: Number(POS_ID),
//                         sessionId: orderId,
//                         amount: Math.round(expectedAmount * 100),
//                         currency: "PLN",
//                         orderId: transaction.p24OrderId,
//                         sign: sign
//                     })
//                 });

//                 const verifyResult: P24VerifyResult = await response.json();
//                 p24TransactionStatus = verifyResult?.data?.status || "pending";
//                 const errorCode = verifyResult?.data?.errorCode;
//                 const errorMessage = verifyResult?.data?.errorMessage;

//                 if (p24TransactionStatus === "failure" || p24TransactionStatus === "cancelled") {
//                     p24Status.isRejected = true;
                    
//                     // Mapowanie kodów błędów na zrozumiałe komunikaty
//                     switch (errorCode) {
//                         case "err1":
//                             rejectReason = "insufficient_funds";
//                             p24Status.error = "Insufficient funds in account";
//                             break;
//                         case "err2":
//                             rejectReason = "limit_exceeded";
//                             p24Status.error = "Transaction limit exceeded";
//                             break;
//                         case "err3":
//                             rejectReason = "card_expired";
//                             p24Status.error = "Payment card expired";
//                             break;
//                         case "err4":
//                             rejectReason = "user_cancelled";
//                             p24Status.error = "Transaction cancelled by user";
//                             break;
//                         default:
//                             rejectReason = "other";
//                             p24Status.error = errorMessage || "Transaction was rejected or cancelled";
//                     }
                    
//                     p24Status.rejectReason = rejectReason;
//                 } else if (p24TransactionStatus !== "success" && p24TransactionStatus !== "waiting") {
//                     p24Status.error = `Unexpected status: ${p24TransactionStatus}`;
//                     rejectReason = "unexpected_status";
//                 }

//                 // Sprawdzanie czy transakcja nie wygasła (po 2 minutach)
//                 const transactionExpired = Date.now() > (transaction.createdAt?.getTime() + 2 * 60 * 1000);
//                 if (p24TransactionStatus === "pending" && transactionExpired) {
//                     p24Status.isExpired = true;
//                     rejectReason = "expired";
//                 }
//             } catch (error) {
//                 console.error('Error verifying P24 transaction:', error);
//                 p24Status.error = error instanceof Error ? error.message : 'Unknown P24 error';
//                 rejectReason = "verification_error";
//             }
//         }

//         // Określanie końcowego stanu transakcji
//         if (transaction.status) {
//             state = 'success';
//         } else if (p24Status.isRejected) {
//             state = rejectReason as TransactionState || 'other';
//         } else if (p24Status.isExpired) {
//             state = 'expired';
//         } else if (p24TransactionStatus === "failure" || p24TransactionStatus === "cancelled") {
//             state = rejectReason as TransactionState || 'other';
//         } else if (p24TransactionStatus === "waiting") {
//             state = 'pending';
//         } else if (transaction.amount && transaction.amount !== expectedAmount) {
//             state = 'wrong_amount';
//         }

//         // Przygotowanie odpowiedzi
//         const response = {
//             status: transaction.status,
//             state,
//             p24Status,
//             p24TransactionStatus,
//             rejectReason,
//             products: transaction.products,
//             customer: transaction.customer,
//             amount: transaction.amount,
//             expectedAmount,
//             lastVerification: new Date().toISOString()
//         };

//         return NextResponse.json(response);
//     } catch (error) {
//         console.error('Error details:', error);
//         return NextResponse.json(
//             { 
//                 error: error instanceof Error ? error.message : "An unknown error occurred",
//                 state: 'system_error' as TransactionState,
//                 rejectReason: 'system_error'
//             },
//             { status: 500 }
//         );
//     }
// }
