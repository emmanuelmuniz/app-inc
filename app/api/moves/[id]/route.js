import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import Move from "../../../../models/move";
import { getToken } from "next-auth/jwt"

export const dynamic = "force-dynamic";

export async function PUT(req, { params }) {
    const token = await getToken({ req });
    if (token) {
        let { id } = params;
        let { newDetail: detail,
            newDate: date,
            newAmount: amount,
            newMoveType: moveType,
            newCategory: category,
            newPayMethod: payMethod,
            newLastUpdateBy: lastUpdateBy } = await req.json();
        amount = amount.replace(",", ".");
        await connectMongoDB();
        await Move.findByIdAndUpdate(id, { detail, date, amount, moveType, category, payMethod, lastUpdateBy });
        return NextResponse.json({ message: "Move edited." }, { status: 200 });
    } else {
        return NextResponse.json({ message: "Not Authotized" }, { status: 401 });
    }
}

// export async function GET(req, { params }) {
//     const token = await getToken({ req });
//     if (token) {
//         const { id } = params;
//         await connectMongoDB();
//         const move = await Move.findOne({ _id: id });
//         return NextResponse.json({ move }, { status: 200 });
//     } else {
//         return NextResponse.json({ message: "Not Authotized" }, { status: 401 });
//     }
// }


export async function GET(req, { params }) {
    // const token = await getToken({ req });
    // if (token) {
    const { startDate, endDate } = req.query;
    await connectMongoDB();

    // Convierte las fechas a objetos Date si no lo has hecho aún
    const start = new Date(startDate);
    const end = new Date(endDate);

    const moves = await Move.find({
        createdAt: {
            $gte: start,
            $lte: end,
        },
    });

    return NextResponse.json({ moves }, { status: 200 });
    // } else {
    //     return NextResponse.json({ message: "Not Authorized" }, { status: 401 });
    // }
}