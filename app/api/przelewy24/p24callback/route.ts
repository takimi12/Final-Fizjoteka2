import { NextRequest, NextResponse } from "next/server";
import Transaction, { ITransaction } from "../../../../backend/models/transactionID";
import { dbConnect } from "../../../../backend/config/dbConnect";
import { sendEmail } from "../../../../libs/emailService";
import { P24, Currency } from "p24-sdk";  // Zakładając, że masz odpowiednią bibliotekę do interakcji z Przelewy24

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

    await dbConnect();
    const transaction: ITransaction = await Transaction.findById(body.sessionId).populate("products");

    if (!transaction) {
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

    console.log("p24 callback", totalPrice * 100);

    try {
        const result = await p24.verifyTransaction({
            sessionId: body.sessionId,
            amount: totalPrice * 100,  // Amount must be in the smallest currency unit (e.g., groszy for PLN)
            currency: Currency.PLN,
            orderId: body.orderId,
        });

        if (result.status !== 'SUCCESS') {
            // Jeśli transakcja nie przeszła pomyślnie, zaktualizuj dane w bazie i dodaj informacje o błędzie
            await Transaction.findOneAndUpdate(
                { _id: body.sessionId },
                {
                    status: false,  // Zmieniamy status na false
                    errorMessage: result.error_message || 'Unknown error',  // Zapisujemy komunikat błędu
                    errorCode: result.error_code || 'Unknown code',         // Zapisujemy kod błędu
                    $push: {
                        paymentHistory: {
                            status: 'FAILED',
                            timestamp: new Date(),
                            details: result.error_message || 'Unknown error',  // Zapisujemy szczegóły błędu w historii płatności
                        }
                    },
                    lastUpdated: new Date(),  // Aktualizujemy datę ostatniej zmiany
                },
                { new: true }  // Zwróć zaktualizowany dokument
            );

            return NextResponse.json({ message: "Transaction verification failed", error: result }, { status: 400 });
        }

        // Jeśli transakcja została pomyślnie zweryfikowana, zaktualizuj dane w bazie
        await Transaction.findOneAndUpdate(
            { _id: body.sessionId },
            { status: true, lastUpdated: new Date() }
        );

        const urls = transaction.products.map((el) => el.url);

        try {
            // Wysyłanie e-maila do klienta z linkiem do pobrania poradnika
            if (transaction.customer && transaction.customer.email) {
                await sendEmail({
                    Source: "tomek12olech@gmail.com",
                    Destination: { ToAddresses: [transaction.customer.email] },
                    Message: {
                        Subject: { Data: "Przesyłamy link do pobrania poradnika" },
                        Body: { Html: { Data: `Kliknij <a href="${urls[0]}">tutaj</a> aby pobrać poradnik.` } },
                    },
                });
            }
            return NextResponse.json({ message: "Email sent" });
        } catch (err) {
            console.log("Error sending email", err);
            return NextResponse.json({ message: "Error sending email" }, { status: 500 });
        }

    } catch (err) {
        console.log("Error in transaction verification:", err);
        return NextResponse.json({ message: "Error during transaction verification" }, { status: 500 });
    }
}
