import { NextResponse } from 'next/server';
import { dbConnect } from '../../../backend/config/dbConnect';
import Transaction from '../../../backend/models/transactionID';

export async function GET(request: Request) {
  await dbConnect();
  
  // Pobierz orderId z URL
  const url = new URL(request.url);
  const orderId = url.searchParams.get('orderId');

  if (!orderId) {
    return NextResponse.json(
      { status: 'ERROR', message: 'Missing orderId' },
      { status: 400 }
    );
  }

  try {
    const transaction = await Transaction.findById(orderId);
    
    if (!transaction) {
      return NextResponse.json(
        { status: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: transaction.status ? 'SUCCESS' : 'PENDING',
      transaction
    });
  } catch (error) {
    console.error('Error checking payment status:', error);
    return NextResponse.json(
      { status: 'ERROR' },
      { status: 500 }
    );
  }
}