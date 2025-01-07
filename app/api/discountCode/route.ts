import { dbConnect } from "../../../backend/config/dbConnect";
import DiscountCode from "../../../backend/models/DiscountCode";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET() {
	await dbConnect();
	try {
		const codes = await DiscountCode.find({});
		return NextResponse.json({ success: true, data: codes }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ success: false }, { status: 400 });
	}
}

export async function POST(request: NextRequest) {
	await dbConnect();
	try {
		const body = await request.json();
		const code = await DiscountCode.create(body);
		return NextResponse.json({ success: true, data: code }, { status: 201 });
	} catch (error) {
		return NextResponse.json({ success: false }, { status: 400 });
	}
}
