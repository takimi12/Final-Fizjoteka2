import { NextRequest, NextResponse } from 'next/server';
import Transaction from '../../../../backend/models/transactionID';
import {
  P24,
  Order,
  Currency,
  Country,
  Language,
  NotificationRequest,
  Verification,
  Encoding
} from "@ingameltd/node-przelewy24";
import {dbConnect} from '../../../../backend/config/dbConnect';
import mongoose from 'mongoose';
import Topics from '../../../../backend/models/topics';

interface CartItem {
  id: string;

}

interface RequestBody {
  cartItems: CartItem[];

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
    const allProducts = products.map(product => ({
      name: product.title,
      price: product.price,
      quantity: 1,
      url: product.pdfFileUrl
    }));
    
    console.log("allProducts", allProducts);

    const transaction = await Transaction.create({
      status: false,
      products: allProducts,
      customer: {
        email: 'tomek12olech@gmail.com',
        nameAndSurname: 'John Doe',
        companyName: '',
        nip: ''
      }
    });

    const POS_ID = 303306;
    const CRC = "d6cfd7c99d6a21f6";
    const API_KEY = "ab5592ef8267599515dad8d635afae29";

    const p24 = new P24(
      POS_ID,
      POS_ID,
      API_KEY,
      CRC,
      {
        sandbox: true 
      }
    );

    const result = await p24.createTransaction({
      sessionId: transaction._id.toString(),
      amount: totalPrice * 100, 
      currency: Currency.PLN,
      description: "test order",
      email: "john.doe@example.com",
      country: Country.Poland,
      language: Language.PL,
      urlReturn: "http://localhost:3000/pl/continue",
      urlStatus: "http://localhost:3000/api/przelewy24/p24callback", 
      timeLimit: 15, 
      encoding: Encoding.UTF8,
    });

    return NextResponse.json({ url: result.link });

  } catch (err) {
    console.log("err", err);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}