import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import Category from "../../../../models/category";
import { getToken } from "next-auth/jwt"

export const dynamic = "force-dynamic";

export async function PUT(req, { params }) {
    const token = await getToken({ req });
    if (token) {
        let { id } = params;
        let { category: category } = await req.json();
        await connectMongoDB();
        await Category.findByIdAndUpdate(id, { category });
        return NextResponse.json({ message: "Category edited." }, { status: 200 });
    } else {
        return NextResponse.json({ message: "Not Authotized" }, { status: 401 });
    }
}

export async function GET(req, { params }) {
    const token = await getToken({ req });
    if (token) {
        const { id } = params;
        await connectMongoDB();
        const Category = await Category.findOne({ _id: id });
        return NextResponse.json({ Category }, { status: 200 });
    } else {
        return NextResponse.json({ message: "Not Authotized" }, { status: 401 });
    }
}