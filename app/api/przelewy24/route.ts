import { NextRequest, NextResponse } from "next/server";
import Transaction from "../../../backend/models/transactionID";
import {
	P24,
	Order,
	Currency,
	Country,
	Language,
	NotificationRequest,
	Verification,
	Encoding,
} from "@ingameltd/node-przelewy24";
import { dbConnect } from "../../../backend/config/dbConnect";
import mongoose from "mongoose";
import Topics from "../../../backend/models/topics";

interface CartItem {
	id: string;
}

interface RequestBody {
	cartItems: CartItem[];
	email: string;
}

interface Product {
	_id: mongoose.Types.ObjectId;
	title: string;
	price: number;
	pdfFileUrl: string;
}

export async function POST(request: NextRequest) {
	const body: RequestBody = await request.json();

	await dbConnect();

	const productPromises = body.cartItems.map((el: CartItem) => {
		return Topics.findById(el.id);
	});

	const products: Product[] = await Promise.all(productPromises);

	const totalPrice = products.reduce((acc: number, cur: Product) => {
		return acc + Number(cur.price);
	}, 0);

	try {
		const allProducts = products.map((product) => ({
			name: product.title,
			price: product.price,
			quantity: 1,
			url: product.pdfFileUrl,
		}));

		const transaction = await Transaction.create({
			status: false,
			products: allProducts,
			customer: {
				email: body.email,
				nameAndSurname: "John Doe",
				companyName: "",
				nip: "",
			},
		});

		const POS_ID = process.env.P24_MERCHANT_ID!;
		const CRC = process.env.P24_CRC_KEY!;
		const API_KEY = process.env.P24_API_KEY!;

		const p24 = new P24(Number(POS_ID), Number(POS_ID), API_KEY, CRC, {
			sandbox: true,
		});

		console.log("p24 create transaction", totalPrice * 100);

		const result = await p24.createTransaction({
			sessionId: transaction._id.toString(),
			amount: totalPrice * 100,
			currency: Currency.PLN,
			description: "test order",
			email: body.email,
			country: Country.Poland,
			language: Language.PL,
			urlReturn: `${process.env.NEXT_PUBLIC_APP_URL}/pl/continue`,
			urlStatus: `${process.env.NEXT_PUBLIC_APP_URL}/api/przelewy24/p24callback`,
			timeLimit: 15,
			encoding: Encoding.UTF8,
		});

		return NextResponse.json({ url: result.link });
	} catch (err) {
		return NextResponse.json({ error: "An error occurred" }, { status: 500 });
	}
}
