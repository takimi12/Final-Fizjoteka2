import { NextRequest, NextResponse } from "next/server";
import Transaction from "../../../../backend/models/transactionID";
import { dbConnect } from "../../../../backend/config/dbConnect";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const orderId = searchParams.get('orderId');

        if (!orderId) {
            return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
        }

        await dbConnect();
        
        const transaction = await Transaction.findById(orderId);
        
        if (!transaction) {
            return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
        }

        return NextResponse.json({
            status: transaction.status,
            products: transaction.products,
            customer: transaction.customer
        });
    } catch (error) {
        console.error('Error fetching transaction status:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "An unknown error occurred" },
            { status: 500 }
        );
    }
}