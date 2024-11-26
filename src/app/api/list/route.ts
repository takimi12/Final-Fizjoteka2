
import { NextResponse } from 'next/server';
import { sendEmail } from '../../../../libs/emailService';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await sendEmail(body);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'GET method not supported for this endpoint' }, { status: 405 });
}