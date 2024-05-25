"use client"

import { useState } from "react"
import { useRouter } from "next/navigation";

export default function AddMove() {
    const [detail, setDetail] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [moveType, setMoveType] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!detail || !amount || !date || !moveType) {
            alert("Todos los datos son requeridos para crear un nuevo movimiento.");
        }

        try {
            const res = await fetch('http://localhost:3000/api/moves', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ detail, amount, date, moveType })
            });

            if (res.ok) {
                router.push('/');
            } else {
                throw new Error('Failed to create a new Move')
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex justify-center bg-slate-100">
            <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-3 w-7/12 p-5">
                <input
                    onChange={(e) => setDetail(e.target.value)}
                    value={detail}
                    type="text"
                    className="border rounded border-slate-500 px-2 py-2 mb-1"
                    placeholder="Detalle" />
                <input
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                    type="text"
                    className="border rounded border-slate-500 px-2 py-2 mb-1"
                    placeholder="Monto" />
                <input
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                    type="text"
                    className="border rounded border-slate-500 px-2 py-2 mb-1"
                    placeholder="Fecha del movimiento" />
                <input
                    onChange={(e) => setMoveType(e.target.value)}
                    value={moveType}
                    type="text"
                    className="border rounded border-slate-500 px-2 py-2 mb-1"
                    placeholder="Tipo de movimiento" />
                <button type="submit" className="self-center bg-blue-500 font-bold text-white py-3 px-6 mt-3 w-fit rounded-lg">Crear Movimiento</button>
            </form>
        </div>
    )
}