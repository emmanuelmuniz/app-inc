import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import Move from "../../../../models/move";

export async function PUT(request, { params }) {
    const { id } = params;
    const { newDetail: detail, newDate: date, newAmount: amount, newMoveType: moveType } = await request.json();
    await connectMongoDB();
    await Move.findByIdAndUpdate(id, { detail, date, amount, moveType });

    return NextResponse.json({ message: "Move edited." }, { status: 200 });
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const move = await Move.findOne({ _id: id });
    return NextResponse.json({ move }, { status: 200 });
}