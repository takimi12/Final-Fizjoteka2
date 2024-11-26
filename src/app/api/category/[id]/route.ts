import { dbConnect } from "../../../../../backend/config/dbConnect";
import Categorylist from "../../../../../backend/models/category";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

interface CategoryUpdateData {
  newTitle: string;
  newSubtitle1: string;
  newSubtitle2: string;
  newSubtitle3: string;
  newDescription: string;
  newPrice: number;
  newCategory: string;
  imageFileUrl: string;
}

export async function PUT(request: NextRequest, { params }: { params: Params }) {
  const { id } = params;
  const { newTitle: title, newSubtitle1: subtitle1, newSubtitle2: subtitle2, newSubtitle3: subtitle3, newDescription: description, newPrice: price, newCategory: category, imageFileUrl }: CategoryUpdateData = await request.json();
  await dbConnect();
  await Categorylist.findByIdAndUpdate(id, { title, subtitle1, subtitle2, subtitle3, description, price, category, imageFileUrl });
  return NextResponse.json({ message: "Category updated" }, { status: 200 });
}

export async function GET(request: NextRequest, { params }: { params: Params }) {
  const { id } = params;
  await dbConnect();
  const category = await Categorylist.findOne({ _id: id });
  return NextResponse.json({ category }, { status: 200 });
}