"use client"

import EditMoveForm from "@/components/EditMoveForm"
import { useSession } from "next-auth/react";


const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getMoveById = async (id) => {
    try {
        const res = await fetch(`${apiUrl}api/moves/${id}`, {
            cache: "no-store"
        });

        if (!res.ok) {
            throw new Error("Failed to fetch Move.");
        }

        return res.json();

    } catch (error) {
        console.log(error);
    }
}

export default async function EditMoqve({ params }) {
    const { data: session } = useSession({ required: true });

    const { id } = params;
    const { move } = await getMoveById(id);
    const { detail, amount, date, moveType, category, payMethod } = move;

    return <div className="max-w-* bg-lavender rounded-lg p-3">
        <EditMoveForm
            id={id}
            detail={detail}
            amount={amount}
            date={date}
            moveType={moveType}
            category={category}
            payMethod={payMethod}
            lastUpdateBy={session.user.name} />
    </div>
}