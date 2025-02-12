import { Currency, P24 } from "@ingameltd/node-przelewy24";
import { NextRequest, NextResponse } from "next/server";
import Transaction, { ITransaction } from "../../../../backend/models/transactionID";
import { dbConnect } from "../../../../backend/config/dbConnect";
import { sendEmail } from "../../../../libs/emailService";

interface NotificationBody {
    merchantId: number;
    posId: number;
    sessionId: string;
    amount: number;
    originAmount: number;
    currency: string;
    orderId: number;
    methodId: number;
    statement: string;
    sign: string;
}

export async function POST(request: NextRequest) {
    const body: NotificationBody = await request.json();

    try {
        await dbConnect();
        const transaction: ITransaction = await Transaction.findById(body.sessionId).populate("products");

        if (!transaction) {
            return NextResponse.redirect(
                `${process.env.NEXT_PUBLIC_APP_URL}/error?message=transaction_not_found`
            );
        }

        const totalPrice = transaction.products.reduce((acc: number, cur) => {
            return acc + Number(cur.price);
        }, 0);

        const POS_ID = process.env.P24_MERCHANT_ID!;
        const CRC = process.env.P24_CRC_KEY!;
        const API_KEY = process.env.P24_API_KEY!;

        const p24 = new P24(Number(POS_ID), Number(POS_ID), API_KEY, CRC, {
            sandbox: true,
        });

        try {
            const verificationResult = await p24.verifyTransaction({
                sessionId: body.sessionId,
                amount: totalPrice * 100,
                currency: Currency.PLN,
                orderId: body.orderId,
            });

            // Sprawdzanie wyniku weryfikacji i statusu płatności
            if (verificationResult && body.methodId > 0) {
                // Płatność udana
                await Transaction.findOneAndUpdate(
                    { _id: body.sessionId },
                    {
                        status: true,
                        state: "success",
                        p24OrderId: body.orderId,
                        lastUpdated: new Date(),
                        $push: {
                            paymentHistory: {
                                status: "success",
                                timestamp: new Date(),
                                details: "Płatność zweryfikowana pomyślnie"
                            }
                        }
                    }
                );

                // Wysyłka maila tylko przy udanej płatności
                if (transaction.customer?.email) {
                    try {
                        await sendEmail({
                            Source: "tomek12olech@gmail.com",
                            Destination: { ToAddresses: [transaction.customer.email] },
                            Message: {
                                Subject: { Data: "Przesyłamy link do pobrania poradnika" },
                                Body: { 
                                    Html: { 
                                        Data: `Kliknij <a href="${transaction.products[0]?.url}">tutaj</a> aby pobrać poradnik.` 
                                    } 
                                },
                            },
                        });
                    } catch (emailError) {
                        console.error("Błąd wysyłki maila:", emailError);
                    }
                }

                // Tylko w przypadku sukcesu przekierowujemy na success
                return NextResponse.redirect(
                    `${process.env.NEXT_PUBLIC_APP_URL}/success?orderId=${body.sessionId}`
                );
            }

            // We wszystkich innych przypadkach przekierowujemy na error
            await Transaction.findOneAndUpdate(
                { _id: body.sessionId },
                {
                    status: false,
                    state: "verification_failed",
                    lastUpdated: new Date(),
                    $push: {
                        paymentHistory: {
                            status: "error",
                            timestamp: new Date(),
                            details: "Weryfikacja płatności nie powiodła się"
                        }
                    }
                }
            );

            return NextResponse.redirect(
                `${process.env.NEXT_PUBLIC_APP_URL}/error?message=verification_failed&orderId=${body.sessionId}`
            );

        } catch (p24Error: any) {
            // Obsługa błędów P24
            let errorCode = 'unknown_error';
            let state = 'error';

            if (p24Error.code) {
                switch (p24Error.code) {
                    case 'err51':
                        errorCode = 'invalid_amount';
                        state = 'wrong_amount';
                        break;
                    case 'err4':
                        errorCode = 'invalid_transaction';
                        state = 'error';
                        break;
                    case 'err6':
                        errorCode = 'canceled';
                        state = 'canceled';
                        break;
                    case 'err7':
                        errorCode = 'rejected';
                        state = 'rejected';
                        break;
                }
            }

            await Transaction.findOneAndUpdate(
                { _id: body.sessionId },
                {
                    status: false,
                    state: state,
                    lastUpdated: new Date(),
                    $push: {
                        paymentHistory: {
                            status: "error",
                            timestamp: new Date(),
                            details: p24Error.message || "Błąd przetwarzania płatności"
                        }
                    }
                }
            );

            return NextResponse.redirect(
                `${process.env.NEXT_PUBLIC_APP_URL}/error?message=${errorCode}&orderId=${body.sessionId}`
            );
        }

    } catch (error) {
        console.error("Błąd przetwarzania callbacku:", error);
        return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_APP_URL}/error?message=internal_error`
        );
    }
}