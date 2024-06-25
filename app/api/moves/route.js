import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Move from "../../../models/move";

export const dynamic = "force-dynamic";

export async function POST(request) {
    try {
        const moves = await request.json();
        console.log(moves);

        await connectMongoDB();

        await Move.insertMany(moves);

        return NextResponse.json({ message: "Moves created" }, { status: 201 });
    } catch (error) {
        console.error("Error creating moves:", error);
        return NextResponse.json({ error: "Failed to create moves" }, { status: 500 });
    }
}

export async function GET() {
    await connectMongoDB();
    const moves = await Move.find();
    return NextResponse.json({ moves });
}
