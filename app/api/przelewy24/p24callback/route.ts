// import { NextRequest, NextResponse } from "next/server";
// import Transaction, { ITransaction } from "../../../../backend/models/transactionID";
// import { dbConnect } from "../../../../backend/config/dbConnect";
// import { sendEmail } from "../../../../libs/emailService";

// interface NotificationBody {
//   merchantId: number;
//   posId: number;
//   sessionId: string;
//   amount: number;
//   originAmount: number;
//   currency: string;
//   orderId: number;
//   methodId: number;
//   statement: string;
//   sign: string;
// }export async function POST(request: NextRequest) {
// 	const body: NotificationBody = await request.json();
  
// 	await dbConnect();
// 	const transaction: ITransaction = await Transaction.findById(body.sessionId).populate("products");
  
// 	if (!transaction) {
// 	  return NextResponse.json({ message: "Transaction not found" }, { status: 404 });
// 	}
  
// 	const totalPrice = transaction.products.reduce((acc: number, cur) => {
// 	  return acc + Number(cur.price);
// 	}, 0);
  
// 	const POS_ID = process.env.P24_MERCHANT_ID!;
// 	const CRC = process.env.P24_CRC_KEY!;
// 	const API_KEY = process.env.P24_API_KEY!;
  
// 	const sign = generateSign(body.sessionId, totalPrice * 100, body.orderId, POS_ID, CRC); // Funkcja do generowania podpisu
// 	const verifyUrl = `https://secure.przelewy24.pl/api/v1/transaction/verify`;
  
// 	// Wysłanie zapytania HTTP do Przelewy24 w celu weryfikacji transakcji
// 	const response = await fetch(verifyUrl, {
// 	  method: 'POST',
// 	  headers: {
// 		'Content-Type': 'application/json',
// 	  },
// 	  body: JSON.stringify({
// 		pos_id: POS_ID,
// 		session_id: body.sessionId,
// 		amount: totalPrice * 100,
// 		currency: 'PLN',
// 		order_id: body.orderId,
// 		sign: sign,
// 	  }),
// 	});
  
// 	const result = await response.json();
  
// 	if (result.status === 'SUCCESS') {
// 	  await Transaction.findOneAndUpdate({ _id: body.sessionId }, { status: true });
  
// 	  const urls = transaction.products.map((el) => el.url);
  
// 	  try {
// 		if (transaction.customer && transaction.customer.email) {
// 		  await sendEmail({
// 			Source: "tomek12olech@gmail.com",
// 			Destination: { ToAddresses: [transaction.customer.email] },
// 			Message: {
// 			  Subject: { Data: "Przesyłamy link do pobrania poradnika" },
// 			  Body: { Html: { Data: `Kliknij <a href="${urls[0]}">tutaj</a> aby pobrać poradnik.` } },
// 			},
// 		  });
// 		}
// 		return NextResponse.json({ message: "Email sent" });
// 	  } catch (err) {
// 		console.log("err", err);
// 		return NextResponse.json({ message: "Error sending email" }, { status: 500 });
// 	  }
// 	} else {
// 	  // Jeśli transakcja nie została pomyślnie zweryfikowana, zaktualizuj status transakcji i zapisz szczegóły błędu
// 	  await Transaction.findOneAndUpdate(
// 		{ _id: body.sessionId },
// 		{
// 		  status: false,
// 		  errorMessage: result.error_message || 'Unknown error', // Zapisujemy komunikat o błędzie
// 		  errorCode: result.error_code || 'Unknown code', // Możesz również dodać kod błędu, jeśli jest dostępny
// 		}
// 	  );
  
// 	  return NextResponse.json({ message: "Transaction verification failed", error: result }, { status: 400 });
// 	}
//   }
  
//   function generateSign(sessionId: string, amount: number, orderId: number, posId: string, crc: string): string {
// 	// Logika generowania podpisu na podstawie dostępnych danych
// 	const hash = require('crypto').createHash('sha256');
// 	hash.update(`${sessionId}${amount}${orderId}${posId}${crc}`);
// 	return hash.digest('hex').toUpperCase();
//   }
  

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

	await dbConnect();
	const transaction:ITransaction = await Transaction.findById(body.sessionId).populate("products");

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


	const result = await p24.verifyTransaction({
		sessionId: body.sessionId,
		amount: totalPrice * 100,
		currency: Currency.PLN,
		orderId: body.orderId,
	});


	if (result) {
		await Transaction.findOneAndUpdate({ _id: body.sessionId }, { status: true });

		const urls = transaction.products.map((el) => el.url);

		try {
			if(transaction.customer && transaction.customer.email){
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
			console.log("err", err);
			return NextResponse.json({ message: "Error sending email" }, { status: 500 });
		}
	}
}