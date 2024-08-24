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
        const url = new URL(req.url);

        const startDate = url.searchParams.get('startDate');
        const endDate = url.searchParams.get('endDate');

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return NextResponse.json({ message: "Invalid date range" }, { status: 400 });
        }

        const moves = await Move.find({
            date: {
                $gte: start,
                $lte: end
            }
        }).sort({ date: -1 });

        return NextResponse.json({ moves });
    } else {
        return NextResponse.json({ message: "Not Authorized" }, { status: 401 });
    }
}

