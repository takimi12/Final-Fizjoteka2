import {connectMongoDB} from "../../../../backend/config/dbDataconnect";
import { NextResponse } from "next/server";
import Newsletter from "../../../../backend/models/newsletter";

export async function POST(request) {
  try {
    const requestData = await request.json();

    const { name, email } = requestData;

    await connectMongoDB();
    await Newsletter.create({ name, email });

    return NextResponse.json({ message: "Topic Created" }, { status: 201 });
  } catch (error) {
    console.error("Błąd podczas obsługi żądania POST:", error); 
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });

  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const newsletters = await Newsletter.find({});

    return NextResponse.json(newsletters, { status: 200 });
  } catch (error) {
    console.error("Błąd podczas obsługi żądania GET:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}