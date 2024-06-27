import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import Move from "../../../../models/move";

export const dynamic = "force-dynamic";

export async function POST(request) {
    let { detail, date, amount, category, moveType, payMethod } = await request.json();
    let move = {
        detail: detail,
        date: date,
        amount: amount,
        category: category,
        moveType: moveType,
        payMethod: payMethod
    }
    move.amount = move.amount.replace(",", ".");
    console.log(move)
    await connectMongoDB();
    await Move.create(move);
    return NextResponse.json({ message: "Move created" }, { status: 201 });
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Move.findByIdAndDelete(id);
    return NextResponse.json({ message: "Move deleted." });
}