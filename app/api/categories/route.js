import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Category from "../../../models/category";
import { getToken } from "next-auth/jwt"

export const dynamic = "force-dynamic";

export async function POST(req) {
    const token = await getToken({ req });
    if (token) {
        let { category } = await req.json();
        await connectMongoDB();
        await Category.create({ category });
        return NextResponse.json({ message: "Category created" }, { status: 201 });
    } else {
        return NextResponse.json({ message: "Not Authotized" }, { status: 401 });
    }
}

export async function GET(req) {
    const token = await getToken({ req });
    if (token) {
        await connectMongoDB();
        const categories = await Category.find();
        return NextResponse.json({ categories });
    } else {
        return NextResponse.json({ message: "Not Authotized" }, { status: 401 });
    }
}

export async function DELETE(req) {
    const token = await getToken({ req });
    if (token) {
        const id = req.nextUrl.searchParams.get("id");
        await connectMongoDB();
        await Category.findByIdAndDelete(id);
        return NextResponse.json({ message: "Category deleted." });
    } else {
        return NextResponse.json({ message: "Not Authotized" }, { status: 401 });
    }
}