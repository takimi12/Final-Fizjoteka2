import { dbConnect } from "../../../backend/config/dbConnect";
import Category from "../../../backend/models/category";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

interface CategoryData {
	title: string;
	subtitle1: string;
	subtitle2: string;
	subtitle3: string;
	description: string;
	category: string;
	imageFileUrl: string;
}

export async function POST(request: NextRequest) {
	try {
		const {
			title,
			subtitle1,
			subtitle2,
			subtitle3,
			description,
			category,
			imageFileUrl,
		}: CategoryData = await request.json();

		console.log("Received data:", {
			title,
			subtitle1,
			subtitle2,
			subtitle3,
			description,
			category,
			imageFileUrl,
		});

		await dbConnect();
		
		const newCategory = await Category.create({
			title,
			subtitle1,
			subtitle2,
			subtitle3,
			description,
			category,
			imageFileUrl,
		});

		console.log("Category created successfully:", newCategory);
		
		return NextResponse.json({ 
			message: "Category Created", 
			category: newCategory 
		}, { status: 201 });
		
	} catch (err) {
		console.error("Error creating category:", err);
		return NextResponse.json({ 
			message: "Error creating category", 
			error: err instanceof Error ? err.message : "Unknown error" 
		}, { status: 500 });
	}
}

export async function GET() {
	await dbConnect();
	const categories = await Category.find();
	return NextResponse.json({ categories });
}

export async function DELETE(request: NextRequest) {
	const id = request.nextUrl.searchParams.get("id");
	await dbConnect();
	await Category.findByIdAndDelete(id);
	return NextResponse.json({ message: "Category deleted" }, { status: 200 });
}