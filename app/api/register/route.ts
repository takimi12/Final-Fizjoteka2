import User from "../../../backend/models/userschema";
import { dbConnect } from "../../../backend/config/dbConnect";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

interface UserInput {
  name: string;
  email: string;
  password: string;
  role: string;
}

export const POST = async (request: Request): Promise<NextResponse> => {
  try {
    const data: UserInput = await request.json();
    console.log("Received data:", data);

    const { name, email, password, role } = data;

    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new NextResponse("Email is already in use", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    console.log("New user object:", newUser);

    await newUser.save();
    return new NextResponse("User is registered", { status: 200 });
  } catch (err: unknown) {
    console.error("Error details:", err);
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    return new NextResponse(errorMessage, { status: 500 });
  }
};
