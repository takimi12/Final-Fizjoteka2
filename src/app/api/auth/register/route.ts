import { dbConnect } from "../../../../../backend/config/dbConnect";
import User from "../../../../../backend/models/user";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();
        const user = await User.create(body);

        return NextResponse.json({
            message: "User Created successfully!",
            user
        }, {
            status: 200
        });

    } catch (e) {
        console.log(e)
        return NextResponse.json(
            { message: "Server error, please try again!" },
            { status: 500 }
        );
    }
}