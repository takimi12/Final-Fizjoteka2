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
    try {
        const body: NotificationBody = await request.json();
        console.log("Received notification body:", body);

        await dbConnect();
        const transaction: ITransaction = await Transaction.findById(body.sessionId).populate("products");

        if (!transaction) {
            console.log("Transaction not found:", body.sessionId);
            return NextResponse.json({ message: "Transaction not found" }, { status: 404 });
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
            const result = await p24.verifyTransaction({
                sessionId: body.sessionId,
                amount: Math.round(totalPrice * 100),
                currency: Currency.PLN,
                orderId: body.orderId,
            });

            console.log("P24 verification result:", result);

            if (result) {
                // Update transaction with success status and details
                await Transaction.findOneAndUpdate(
                    { _id: body.sessionId },
                    {
                        status: true,
                        state: 'completed',
                        p24Status: {
                            isExpired: false,
                            isRejected: false,
                            lastChecked: new Date(),
                            methodId: body.methodId,
                            statement: body.statement,
                            orderId: body.orderId
                        }
                    }
                );

                const urls = transaction.products.map((el) => el.url);

                if (transaction.customer && transaction.customer.email) {
                    try {
                        await sendEmail({
                            Source: "tomek12olech@gmail.com",
                            Destination: { ToAddresses: [transaction.customer.email] },
                            Message: {
                                Subject: { Data: "Przesyłamy link do pobrania poradnika" },
                                Body: { Html: { Data: `Kliknij <a href="${urls[0]}">tutaj</a> aby pobrać poradnik.` } },
                            },
                        });
                        console.log("Success email sent to:", transaction.customer.email);
                    } catch (emailError) {
                        console.error("Email sending error:", emailError);
                        return NextResponse.json({
                            message: "Payment completed but email failed",
                            state: "completed",
                            emailError: true
                        });
                    }
                }

                return NextResponse.json({
                    message: "Payment completed successfully",
                    state: "completed",
                    p24Status: {
                        isExpired: false,
                        isRejected: false,
                        methodId: body.methodId,
                        orderId: body.orderId
                    }
                });
            } else {
                // Update transaction with pending status
                await Transaction.findOneAndUpdate(
                    { _id: body.sessionId },
                    {
                        state: 'pending',
                        p24Status: {
                            isExpired: false,
                            isRejected: false,
                            lastChecked: new Date(),
                            methodId: body.methodId,
                            statement: body.statement,
                            orderId: body.orderId
                        }
                    }
                );

                return NextResponse.json({
                    message: "Payment verification pending",
                    state: "pending",
                    p24Status: {
                        isExpired: false,
                        isRejected: false,
                        methodId: body.methodId,
                        orderId: body.orderId
                    }
                });
            }
        } catch (verificationError) {
            console.error("P24 verification error:", verificationError);
            
            // Update transaction with error status
            await Transaction.findOneAndUpdate(
                { _id: body.sessionId },
                {
                    state: 'error',
                    p24Status: {
                        isExpired: false,
                        isRejected: true,
                        rejectionReason: verificationError instanceof Error ? verificationError.message : "Unknown verification error",
                        lastChecked: new Date(),
                        methodId: body.methodId,
                        orderId: body.orderId
                    }
                }
            );

            return NextResponse.json({
                message: "Payment verification failed",
                state: "error",
                error: verificationError instanceof Error ? verificationError.message : "Unknown verification error"
            }, { status: 500 });
        }
    } catch (error) {
        console.error("General error:", error);
        return NextResponse.json({
            message: "Internal server error",
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}

// GET endpoint do sprawdzania statusu
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const sessionId = searchParams.get('sessionId');

        if (!sessionId) {
            return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
        }

        await dbConnect();
        const transaction = await Transaction.findById(sessionId);

        if (!transaction) {
            return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
        }

        // Sprawdzanie czy transakcja nie wygasła (15 minut)
        const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
        const transactionDate = new Date(transaction.createdAt);

        if (transactionDate < fifteenMinutesAgo && transaction.state === 'pending') {
            const updatedTransaction = await Transaction.findByIdAndUpdate(
                sessionId,
                {
                    state: 'expired',
                    p24Status: {
                        ...transaction.p24Status,
                        isExpired: true,
                        lastChecked: new Date()
                    }
                },
                { new: true }
            );

            return NextResponse.json({
                state: 'expired',
                p24Status: updatedTransaction?.p24Status
            });
        }

        return NextResponse.json({
            state: transaction.state,
            p24Status: transaction.p24Status
        });

    } catch (error) {
        console.error("Status check error:", error);
        return NextResponse.json({
            error: error instanceof Error ? error.message : "Unknown error checking status"
        }, { status: 500 });
    }
}