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
            return NextResponse.json(
                { 
                    message: "Transaction not found",
                    redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/error`
                }, 
                { status: 404 }
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

        const result = await p24.verifyTransaction({
            sessionId: body.sessionId,
            amount: totalPrice * 100,
            currency: Currency.PLN,
            orderId: body.orderId,
        });

        if (result) {
            await Transaction.findOneAndUpdate(
                { _id: body.sessionId }, 
                { 
                    status: true,
                    state: "success"
                }
            );

            const urls = transaction.products.map((el) => el.url);

            try {
                if(transaction.customer && transaction.customer.email) {
                    await sendEmail({
                        Source: "tomek12olech@gmail.com",
                        Destination: { ToAddresses: [transaction.customer.email] },
                        Message: {
                            Subject: { Data: "Przesyłamy link do pobrania poradnika" },
                            Body: { Html: { Data: `Kliknij <a href="${urls[0]}">tutaj</a> aby pobrać poradnik.` } },
                        },
                    });
                }
                
                return NextResponse.json({ 
                    message: "Payment successful",
                    redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/success`
                });
            } catch (err) {
                console.log("Email sending error:", err);
                // Still redirect to success even if email fails
                return NextResponse.json({ 
                    message: "Payment successful but email failed",
                    redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/success`
                });
            }
        } else {
            await Transaction.findOneAndUpdate(
                { _id: body.sessionId },
                { 
                    status: false,
                    state: "payment_failed"
                }
            );

            return NextResponse.json({ 
                message: "Payment verification failed",
                redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/error`
            });
        }
    } catch (error) {
        console.error("Callback processing error:", error);
        return NextResponse.json({ 
            message: "Internal server error",
            redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/error`
        }, { status: 500 });
    }
}