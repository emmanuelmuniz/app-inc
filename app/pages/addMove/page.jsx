"use client"

import { useState } from "react"
import { useRouter } from "next/navigation";
import { DateInput } from "@nextui-org/date-input";
import { Input } from "@nextui-org/input";
import { today, getLocalTimeZone, parseDate } from "@internationalized/date";
import { Select, SelectItem } from "@nextui-org/select";
import { Button } from "@nextui-org/button";

export default function AddMove() {
    const [detail, setDetail] = useState("");
    const [amount, setAmount] = useState("");
    const [moveType, setMoveType] = useState("");

    const [moveDate, setDate] = useState(today(getLocalTimeZone()));

    const moveTypeItems = [
        { value: "Ingreso", label: "Ingreso" },
        { value: "Egreso", label: "Egreso" }
    ];

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!detail || !amount || !moveDate || !moveType) {
            alert("Todos los datos son requeridos para crear un nuevo movimiento.");
        }

        try {
            const date = new Date(
                moveDate.year,
                moveDate.month - 1,
                moveDate.day
            ).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "numeric",
                day: "numeric"
            });

            const res = await fetch('http://localhost:3000/api/moves', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ detail, amount, date, moveType })
            });

            if (res.ok) {
                router.push('/');
                router.refresh();
            } else {
                throw new Error('Failed to create a new Move')
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex justify-center bg-slate-300">
            <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-3 w-7/12 p-5">
                <Input
                    onChange={(e) => setDetail(e.target.value)}
                    value={detail}
                    type="text"
                    label="Detalle"
                    className="" />
                <Input
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                    type="text"
                    className=""
                    label="Monto" />
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <DateInput
                        label={"Fecha del movimiento"}
                        onChange={setDate}
                        granularity="day"
                        isRequired
                        format="DD/MM/YYYY"
                        value={moveDate}
                    />
                </div>
                <Select
                    label="Tipo de Movimiento"
                    placeholder="Seleccionar"
                    className=""
                    onChange={(e) => setMoveType(e.target.value)}
                    value={moveType}
                >
                    {moveTypeItems.map((moveTypeItem) => (
                        <SelectItem key={moveTypeItem.value} value={moveTypeItem.value}>
                            {moveTypeItem.label}
                        </SelectItem>
                    ))}
                </Select>
                <Button type="submit" color="primary" className="mt-2 w-1/2.5 self-center p-3">
                    Crear Movimiento
                </Button>
            </form>
        </div>
    )
}