import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import Move from "../../../../models/move";
import { getToken } from "next-auth/jwt"

export const dynamic = "force-dynamic";

export async function POST(req) {
    const token = await getToken({ req });
    if (token) {
        let { detail, date, amount, category, moveType, payMethod, userName } = await req.json();
        let move = {
            detail: detail,
            date: date,
            amount: amount,
            category: category,
            moveType: moveType,
            payMethod: payMethod,
            lastUpdateBy: userName
        }
        move.amount = move.amount.replace(",", ".");
        console.log(move)
        await connectMongoDB();
        await Move.create(move);
        return NextResponse.json({ message: "Move created" }, { status: 201 });
    } else {
        return NextResponse.json({ message: "Not Authotized" }, { status: 401 });
    }
}

export async function DELETE(req) {
    const token = await getToken({ req });
    if (token) {
        const id = req.nextUrl.searchParams.get("id");
        await connectMongoDB();
        await Move.findByIdAndDelete(id);
        return NextResponse.json({ message: "Move deleted." });
    } else {
        return NextResponse.json({ message: "Not Authotized" }, { status: 401 });
    }
}