import { dbConnect } from "../../../backend/config/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Newsletter from "../../../backend/models/newsletter";

interface NewsletterRequestData {
	name: string;
	email: string;
}

interface ApiResponse {
	message?: string;
	error?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
	try {
		const requestData: NewsletterRequestData = await request.json();

		const { name, email } = requestData;

		await dbConnect();
		await Newsletter.create({ name, email });

		return NextResponse.json({ message: "Topic Created" }, { status: 201 });
	} catch (error) {
		console.error("Error creating newsletter:", error);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}

export async function GET(): Promise<NextResponse<any[] | ApiResponse>> {
	try {
		await dbConnect();
		const newsletters = await Newsletter.find({});

		return NextResponse.json(newsletters, { status: 200 });
	} catch (error) {
		console.error("Error fetching newsletters:", error);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}