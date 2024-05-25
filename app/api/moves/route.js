import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Move from "../../../models/move";

export const dynamic = "force-dynamic";

export async function POST(request) {
    const { detail, date, amount, moveType } = await request.json();
    await connectMongoDB();
    await Move.create({ detail, date, amount, moveType });
    return NextResponse.json({ message: "Move created" }, { status: 201 });
}

export async function GET() {
    await connectMongoDB();
    const moves = await Move.find();
    return NextResponse.json({ moves });
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Move.findByIdAndDelete(id);
    return NextResponse.json({message: "Move deleted."});
}