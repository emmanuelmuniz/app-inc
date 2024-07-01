import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Move from "../../../models/move";
import { getToken } from "next-auth/jwt"

export const dynamic = "force-dynamic";

export async function POST(req, response) {
    const token = await getToken({ req });
    if (token) {
        try {
            const moves = await req.json();
            console.log(moves);

            await connectMongoDB();

            await Move.insertMany(moves);

            return NextResponse.json({ message: "Moves created" }, { status: 201 });
        } catch (error) {
            console.error("Error creating moves:", error);
            return NextResponse.json({ error: "Failed to create moves" }, { status: 500 });
        }
    } else {
        return NextResponse.json({ message: "Not Authotized" }, { status: 401 });
    }
}

export async function GET(req) {
    const token = await getToken({ req });
    if (token) {
        await connectMongoDB();
        const moves = await Move.find();
        return NextResponse.json({ moves });
    } else {
        return NextResponse.json({ message: "Not Authotized" }, { status: 401 });
    }
}
