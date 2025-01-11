import { NextResponse } from "next/server";
import { fetchData } from "./blogService";

export const GET = async (): Promise<NextResponse> => {
  try {
    const data = await fetchData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
};