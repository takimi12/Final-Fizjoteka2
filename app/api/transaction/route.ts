// app/api/transaction/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "../../../backend/config/dbConnect";
import Transaction from "../../../backend/models/transactionID";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const transaction = await Transaction.findById(params.id);
    
    if (!transaction) {
      return NextResponse.json(
        { message: "Nie znaleziono transakcji" },
        { status: 404 }
      );
    }

    return NextResponse.json(transaction);
  } catch (error) {
    return NextResponse.json(
      { message: "Wystąpił błąd podczas pobierania danych transakcji" },
      { status: 500 }
    );
  }
}