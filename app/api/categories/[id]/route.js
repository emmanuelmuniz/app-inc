import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import Category from "../../../../models/category";

export const dynamic = "force-dynamic";

export async function PUT(request, { params }) {
    let { id } = params;
    let { category: category } = await request.json();
    await connectMongoDB();
    await Category.findByIdAndUpdate(id, { category });
    return NextResponse.json({ message: "Category edited." }, { status: 200 });
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const Category = await Category.findOne({ _id: id })    ;
    return NextResponse.json({ Category }, { status: 200 });
}