import { Currency, P24 } from '@ingameltd/node-przelewy24';
import { NextRequest, NextResponse } from 'next/server';
import Transaction from '../../../../../backend/models/transactionID';
import {dbConnect} from '../../../../../backend/config/dbConnect';
import { sendEmail } from '../../../../../libs/emailService';

interface Product {
  price: string | number;
  url: string;

}

interface TransactionType {
  _id: string;
  products: Product[];

}

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

  console.log("notification from przelewy", body);

  await dbConnect();
  const transaction = await Transaction.findById(body.sessionId).populate('products') as TransactionType;

  if (!transaction) {
    console.log("transaction not found");
    return NextResponse.json({ message: "Transaction not found" }, { status: 404 });
  }

  console.log("transaction", transaction.products);

  const totalPrice = transaction.products.reduce((acc: number, cur: Product) => {
    console.log("cur", cur);
    return acc + Number(cur.price);
  }, 0);

  console.log("test", totalPrice);

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

  // Zakomentowane do czasu, gdy będzie potrzebne
  // const result = await p24.verifyTransaction({
  //   sessionId: body.sessionId,
  //   amount: totalPrice,
  //   currency: Currency.PLN,
  //   orderId: body.orderId,
  // });

  // if(result) {
  await Transaction.findOneAndUpdate({ _id: body.sessionId }, { status: true });

  const urls = transaction.products.map(el => el.url);

  try {
    await sendEmail({
      Source: 'tomek12olech@gmail.com', 
      Destination: { ToAddresses: ['tomek12olech@gmail.com'] }, 
      Message: {
        Subject: { Data: 'Przesyłamy link do pobrania poradnika' },
        Body: { Html: { Data: `Kliknij <a href="${urls[0]}">tutaj</a> aby pobrać poradnik.` } },
      },
    });
    return NextResponse.json({ message: "Email sent" });
  } catch (err) {
    console.log("sending mail err", err);
    return NextResponse.json({ message: "Error sending email" }, { status: 500 });
  }
  // }
}