// pages/api/payment/status.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '../../../backend/config/dbConnect';
import Transaction from '../../../backend/models/transactionID';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const { orderId } = req.query;

  try {
    const transaction = await Transaction.findById(orderId);
    
    if (!transaction) {
      return res.status(404).json({ status: 'NOT_FOUND' });
    }

    return res.status(200).json({
      status: transaction.status ? 'SUCCESS' : 'PENDING',
      transaction
    });
  } catch (error) {
    console.error('Error checking payment status:', error);
    return res.status(500).json({ status: 'ERROR' });
  }
}