"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditMoveForm({ id, detail, amount, date, moveType }) {

    const [newDetail, setDetail] = useState(detail);
    const [newAmount, setAmount] = useState(amount);
    const [newDate, setDate] = useState(date);
    const [newMoveType, setMoveType] = useState(moveType);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:3000/api/moves/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ newDetail, newAmount, newDate, newMoveType }),
            });

            if (!res.ok) {
                throw new Error("Failed to update move.");
            } else {
                router.refresh();
                router.push("/");
            }


        } catch (error) {
            console.log("Error");
        }
    };

    return (
        <div className="flex justify-center bg-slate-100">
            <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-3 w-7/12 p-5">
                <input
                    onChange={e => setDetail(e.target.value)}
                    value={newDetail}
                    type="text"
                    className="border rounded border-slate-500 px-2 py-2 mb-1"
                    placeholder="Detalle" />
                <input
                    onChange={e => setAmount(e.target.value)}
                    value={newAmount}
                    type="text"
                    className="border rounded border-slate-500 px-2 py-2 mb-1"
                    placeholder="Monto" />
                <input
                    onChange={e => setDate(e.target.value)}
                    value={newDate}
                    type="text"
                    className="border rounded border-slate-500 px-2 py-2 mb-1"
                    placeholder="Fecha del movimiento" />
                <input
                    onChange={e => setMoveType(e.target.value)}
                    value={newMoveType}
                    type="text"
                    className="border rounded border-slate-500 px-2 py-2 mb-1"
                    placeholder="Tipo de movimiento" />
                <button className="self-center bg-blue-500 font-bold text-white py-3 px-6 mt-3 w-fit rounded-lg">Actualizar Movimiento</button>
            </form>
        </div>
    )
}