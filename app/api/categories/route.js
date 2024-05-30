import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Category from "../../../models/category";

export const dynamic = "force-dynamic";

export async function POST(request) {
    let { category } = await request.json();
    await connectMongoDB();
    await Category.create({ category });
    return NextResponse.json({ message: "Category created" }, { status: 201 });
}

export async function GET() {
    await connectMongoDB();
    const categories = await Category.find();
    return NextResponse.json({ categories });
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Category.findByIdAndDelete(id);
    return NextResponse.json({message: "Category deleted."});
}