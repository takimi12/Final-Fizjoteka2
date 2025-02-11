import { NextRequest, NextResponse } from "next/server";
import Transaction from "../../../backend/models/transactionID";
import {
    P24,
    Currency,
    Country,
    Language,
    Encoding,
} from "@ingameltd/node-przelewy24";
import { dbConnect } from "../../../backend/config/dbConnect";
import Topics from "../../../backend/models/topics";
import mongoose from "mongoose";

interface CartItem {
    id: string;
}

interface RequestBody {
    cartItems: CartItem[];
    email: string;
    nameAndSurname: string;
    companyName: string;
    nip: string;
}

interface Product {
    _id: mongoose.Types.ObjectId;
    title: string;
    price: number;
    pdfFileUrl: string;
}

export async function POST(request: NextRequest) {
    try {
        const body: RequestBody = await request.json();
        console.log('Received body:', body);

        if (!body.cartItems || !Array.isArray(body.cartItems)) {
            return NextResponse.json(
                { error: "Invalid cart items format" },
                { status: 400 }
            );
        }

        try {
            await dbConnect();
            console.log('Database connected');
        } catch (dbError) {
            console.error('Database connection error:', dbError);
            return NextResponse.json(
                { error: "Database connection failed" },
                { status: 500 }
            );
        }

        const productPromises = body.cartItems.map((el: CartItem) => {
            console.log('Searching for product with ID:', el.id);
            return Topics.findById(el.id);
        });

        const products: Product[] = await Promise.all(productPromises);
        console.log('Found products:', products);

        if (products.some(product => !product)) {
            return NextResponse.json(
                { error: "Some products not found" },
                { status: 404 }
            );
        }

        const totalPrice = products.reduce((acc: number, cur: Product) => {
            return acc + Number(cur.price);
        }, 0);
        console.log('Total price:', totalPrice);

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
                nameAndSurname: body.nameAndSurname,
                companyName: body.companyName,
                nip: body.nip,
            },
        });
        console.log('Transaction created:', transaction._id);

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

        const result = await p24.createTransaction({
            sessionId: transaction._id.toString(),
            amount: Math.round(totalPrice * 100),
            currency: Currency.PLN,
            description: "test order",
            email: body.email,
            country: Country.Poland,
            language: Language.PL,
            urlReturn: `${process.env.NEXT_PUBLIC_APP_URL}/success?orderId=${transaction._id}`,
            urlStatus: `${process.env.NEXT_PUBLIC_APP_URL}/api/przelewy24/p24callback`,
            timeLimit: 15,
            encoding: Encoding.UTF8,
        });

        console.log('P24 transaction created');
        return NextResponse.json({ url: result.link });

    } catch (err) {
        console.error('Error details:', err);
        return NextResponse.json(
            { error: err instanceof Error ? err.message : "An unknown error occurred" },
            { status: 500 }
        );
    }
}