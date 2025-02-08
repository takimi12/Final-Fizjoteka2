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
		console.log("Received P24 callback:", body);

		await dbConnect();
		const transaction: ITransaction | null = await Transaction.findById(body.sessionId).populate("products");

		if (!transaction) {
			console.error("Transaction not found:", body.sessionId);
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

		const result = await p24.verifyTransaction({
			sessionId: body.sessionId,
			amount: totalPrice * 100,
			currency: Currency.PLN,
			orderId: body.orderId,
		});

		if (result) {
			await Transaction.findByIdAndUpdate(body.sessionId, {
				status: true,
				p24OrderId: body.orderId,
				lastUpdated: new Date(),
				$push: {
					paymentHistory: {
						status: "success",
						timestamp: new Date(),
						details: "Płatność zakończona sukcesem",
					},
				},
			});

			console.log("Transaction verified successfully:", body.sessionId);

			const urls = transaction.products.map((el) => el.url);

			try {
				if (transaction.customer && transaction.customer.email) {
					await sendEmail({
						Source: "tomek12olech@gmail.com",
						Destination: { ToAddresses: [transaction.customer.email] },
						Message: {
							Subject: { Data: "Przesyłamy link do pobrania poradnika" },
							Body: { Html: { Data: `Kliknij <a href="${urls[0]}">tutaj</a> aby pobrać poradnik.` } },
						},
					});
					console.log("Email sent to:", transaction.customer.email);
				}
				return NextResponse.json({ message: "Transaction successful, email sent" });
			} catch (err) {
				console.error("Error sending email:", err);
				return NextResponse.json({ message: "Transaction successful, but email failed" }, { status: 500 });
			}
		} else {
			await Transaction.findByIdAndUpdate(body.sessionId, {
				status: false,
				p24OrderId: body.orderId,
				lastUpdated: new Date(),
				$push: {
					paymentHistory: {
						status: "failed",
						timestamp: new Date(),
						details: "Weryfikacja transakcji nie powiodła się",
					},
				},
			});
			console.error("Transaction verification failed:", body.sessionId);
			return NextResponse.json({ message: "Transaction verification failed" }, { status: 400 });
		}
	} catch (err) {
		console.error("Error in P24 callback:", err);
		return NextResponse.json({ message: "Internal server error" }, { status: 500 });
	}
}
