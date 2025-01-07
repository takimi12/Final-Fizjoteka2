import { dbConnect } from "../../../../backend/config/dbConnect";
import Topic from "../../../../backend/models/topics";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

interface TopicUpdateData {
	newTitle: string;
	newSubtitle: string;
	newDescription: string;
	newPrice: number;
	newCategory: string;
	imageFileUrl: string;
}

export async function PUT(request: NextRequest, { params }: { params: Params }) {
	const { id } = params;
	const {
		newTitle: title,
		newSubtitle: subtitle,
		newDescription: description,
		newPrice: price,
		newCategory: category,
		imageFileUrl,
	}: TopicUpdateData = await request.json();
	await dbConnect();
	await Topic.findByIdAndUpdate(id, {
		title,
		subtitle,
		description,
		price,
		category,
		imageFileUrl,
	});
	return NextResponse.json({ message: "Topic updated" }, { status: 200 });
}

export async function GET(request: NextRequest, { params }: { params: Params }) {
	const { id } = params;
	await dbConnect();
	const topic = await Topic.findOne({ _id: id });
	return NextResponse.json({ topic }, { status: 200 });
}
