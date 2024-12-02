import {dbConnect} from "../../../../backend/config/dbConnect";
import { NextResponse } from "next/server";
import Newsletter from "../../../../backend/models/newsletter";

export async function POST(request) {
  try {
    const requestData = await request.json();

    const { name, email } = requestData;

    await dbConnect();
    await Newsletter.create({ name, email });

    return NextResponse.json({ message: "Topic Created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });

  }
}

export async function GET() {
  try {
    await dbConnect();
    const newsletters = await Newsletter.find({});

    return NextResponse.json(newsletters, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}