import { dbConnect } from "../../../../backend/config/dbConnect";
import Categorylist from "../../../../backend/models/category";
import { NextResponse } from "next/server";

interface PutRequestBody {
	newTitle: string;
	newSubtitle1: string;
	newSubtitle2: string;
	newSubtitle3: string;
	newDescription: string;
	newPrice: number;
	newCategory: string;
	imageFileUrl: string;
}

interface Params {
	id: string;
}

export async function PUT(request: Request, { params }: { params: Params }) {
	const { id } = params;
	const {
		newTitle: title,
		newSubtitle1: subtitle1,
		newSubtitle2: subtitle2,
		newSubtitle3: subtitle3,
		newDescription: description,
		newPrice: price,
		newCategory: category,
		imageFileUrl,
	} = (await request.json()) as PutRequestBody;
	await dbConnect();
	await Categorylist.findByIdAndUpdate(id, {
		title,
		subtitle1,
		subtitle2,
		subtitle3,
		description,
		price,
		category,
		imageFileUrl,
	});
	return NextResponse.json({ message: "Topic updated" }, { status: 200 });
}

export async function GET(request: Request, { params }: { params: Params }) {
	const { id } = params;
	await dbConnect();
	const categories = await Categorylist.findOne({ _id: id });
	return NextResponse.json({ categories }, { status: 200 });
}
