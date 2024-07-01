"use client"

import React from "react";
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import { DateInput } from "@nextui-org/date-input";
import { Input } from "@nextui-org/input";
import { today, getLocalTimeZone } from "@internationalized/date";
import { Select, SelectItem } from "@nextui-org/select";
import { Button } from "@nextui-org/button";
import { GetCategories } from '../../api/categories/requests';
import FormatDate from "../../../app/utils/DateFormatter";

async function fetchCategories() {
    const { categories } = await GetCategories();
    return categories;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function AddMove() {
    const router = useRouter();
    const [categories, setCategories] = useState([]);
    const [detail, setDetail] = useState("");
    const [amount, setAmount] = useState("");
    const [moveType, setMoveType] = useState("");
    const [payMethod, setPayMethod] = useState("");
    const [categoryObject, setCategory] = useState({
        _id: "",
        category: "",
    });
    const [moveDate, setDate] = useState(today(getLocalTimeZone()));

    const moveTypeItems = [
        { value: "Ingreso", label: "Ingreso" },
        { value: "Egreso", label: "Egreso" }
    ];

    const payMethodItems = [
        { value: "Banco BBVA", label: "Banco BBVA" },
        { value: "Efectivo", label: "Efectivo" },
        { value: "MP INC.", label: "MP INC." },
        { value: "MP Marcos", label: "MP Marcos" }
    ];

    useEffect(() => {
        fetchCategories().then(data => setCategories(data));
    }, []);

    const validateAmount = (amount) => amount.match(/^\d{1,}(?:,\d{1,2})?$/);

    const isInvalid = React.useMemo(() => {
        if (amount === "") return false;

        return validateAmount(amount) ? false : true;
    }, [amount]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!detail || !amount || !moveDate || !moveType) {
            alert("Todos los datos son requeridos para crear un nuevo movimiento.");
        } else if (amount == (0 || "0,00")) {
            alert("El monto debe ser mayor a 0.");
        } else {
            try {
                const category = {
                    category: categoryObject.category,
                    _id: categoryObject._id
                }

                const dateToAdd = new Date(moveDate.year, moveDate.month - 1, moveDate.day)
                    .toLocaleDateString("es-ES", { year: "numeric", month: "numeric", day: "numeric" });

                const date = FormatDate(dateToAdd);

                const res = await fetch(`${apiUrl}api/moves/move`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({ detail, amount, date, category, moveType, payMethod })
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
    }

    return (
        <div className="flex justify-center bg-lavender rounded-lg p-3">
            <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-3 w-7/12 p-5">
                <Input
                    onChange={(e) => setDetail(e.target.value)}
                    value={detail}
                    type="text"
                    label="Detalle"
                    className="m-1"
                    isRequired />
                <Input
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                    type="text"
                    className="m-1"
                    label="Monto"
                    isRequired
                    isInvalid={isInvalid}
                    placeholder="0,00"
                    color={isInvalid ? "danger" : "black"}
                    errorMessage="Ingresa un número válido" />
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4 m-1">
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
                    label="Medio de pago"
                    placeholder="Seleccionar"
                    className="m-1"
                    onChange={(e) => setPayMethod(e.target.value)}
                    value={payMethod}
                    isRequired
                >
                    {payMethodItems.map((payMethodItem) => (
                        <SelectItem key={payMethodItem.value} value={payMethodItem.value}>
                            {payMethodItem.label}
                        </SelectItem>
                    ))}
                </Select>
                <Select
                    label="Categoría"
                    placeholder="Seleccionar"
                    className="m-1"
                    onChange={(e) => {
                        const selectedCategoryId = e.target.value;
                        const selectedCategory = categories.find(
                            (categoryObject) => categoryObject._id === selectedCategoryId
                        );
                        setCategory(selectedCategory);
                    }}
                    value={categoryObject._id}
                >
                    {categories.map((categoryItem) => (
                        <SelectItem key={categoryItem._id} value={categoryItem}>
                            {categoryItem.category}
                        </SelectItem>
                    ))}
                </Select>
                <Select
                    label="Tipo de Movimiento"
                    placeholder="Seleccionar"
                    className="m-1"
                    onChange={(e) => setMoveType(e.target.value)}
                    value={moveType}
                    isRequired
                >
                    {moveTypeItems.map((moveTypeItem) => (
                        <SelectItem key={moveTypeItem.value} value={moveTypeItem.value}>
                            {moveTypeItem.label}
                        </SelectItem>
                    ))}
                </Select>
                <Button type="submit" className="mt-2 w-1/2.5 p-3 self-center
                    bg-teal text-white font-bold 
                    transition-colors duration-300 ease-in-out 
                    hover:bg-columbia-blue-hover ">
                    Crear Movimiento
                </Button>
            </form>
        </div>
    )
}