"use client"

import React from "react";
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import { DateInput } from "@nextui-org/date-input";
import { Input } from "@nextui-org/input";
import { parseDate } from "@internationalized/date";
import { Select, SelectItem } from "@nextui-org/select";
import { Button } from "@nextui-org/button";
import { GetCategories } from '../app/api/categories/requests';
import FormatDate from "../app/utils/DateFormatter";

async function fetchCategories() {
    const { categories } = await GetCategories();
    return categories;
}

export default function EditMoveForm({ id, detail, amount, date, moveType, category, payMethod }) {
    const [newDetail, setDetail] = useState(detail);
    const [newAmount, setAmount] = useState(amount.toString().replace(/[.]/g, ','));
    const [newMoveType, setMoveType] = useState(moveType);
    const [newPayMethod, setPayMethod] = useState(payMethod);
    const [newCategory, setCategory] = useState({
        _id: category._id,
        category: category.category,
    });

    const parts = date.split("-");
    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const year = parseInt(parts[2]);

    const dateObject = new Date(year, month, day);
    const formattedDate = dateObject.toISOString().slice(0, 10);
    const inputDate = parseDate(formattedDate);
    const [updatedDate, setDate] = useState(inputDate);

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

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories().then(data => setCategories(data));
    }, []);

    const router = useRouter();

    const validateAmount = (newAmount) => newAmount.match(/^\d{1,}(?:,\d{1,2})?$/);

    const isInvalid = React.useMemo(() => {
        if (newAmount === "") return false;

        return validateAmount(newAmount) ? false : true;
    }, [newAmount]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const date = new Date(
                updatedDate.year,
                updatedDate.month - 1,
                updatedDate.day
            ).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "numeric",
                day: "numeric"
            });

            const newDate = FormatDate(date);

            const res = await fetch(`http://localhost:3000/api/moves/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ newDetail, newAmount, newDate, newMoveType, newCategory, newPayMethod }),
            });

            if (!res.ok) {
                console.log(res)
                throw new Error("Failed to update move.");
            }

            router.push("/");
            router.refresh();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex justify-center bg-slate-100">
            <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-3 w-7/12 p-5">
                <Input
                    onChange={(e) => setDetail(e.target.value)}
                    value={newDetail}
                    type="text"
                    label="Detalle"
                    className="m-1"
                    isRequired />
                <Input
                    onChange={(e) => setAmount(e.target.value)}
                    value={newAmount}
                    type="text"
                    className="m-1"
                    label="Monto"
                    isRequired
                    isInvalid={isInvalid}
                    color={isInvalid ? "danger" : "black"}
                    errorMessage="Ingresa un número válido" />
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4 m-1">
                    <DateInput
                        label={"Fecha del movimiento"}
                        onChange={(updatedDate) => setDate(updatedDate)}
                        isRequired
                        format="DD/MM/YYYY"
                        value={updatedDate}
                    />
                </div>
                <Select
                    defaultSelectedKeys={[`${moveType}`]}
                    label="Tipo de Movimiento"
                    onChange={(e) => setMoveType(e.target.value)}
                    value={newMoveType}
                    isRequired
                    className="m-1"
                >
                    {moveTypeItems.map((moveTypeItem) => (
                        <SelectItem key={moveTypeItem.value} value={moveTypeItem.value}>
                            {moveTypeItem.label}
                        </SelectItem>
                    ))}
                </Select>
                <Select
                    label="Categoría"
                    placeholder="Seleccionar"
                    className="m-1"
                    defaultSelectedKeys={[newCategory._id]}
                    onChange={(e) => {
                        const selectedCategoryId = e.target.value;
                        const selectedCategory = categories.find(
                            (newCategory) => newCategory._id === selectedCategoryId
                        );
                        setCategory(selectedCategory);
                    }}
                    value={newCategory._id}
                >
                    {categories.map((categoryItem) => (
                        <SelectItem key={categoryItem._id} value={categoryItem}>
                            {categoryItem.category}
                        </SelectItem>
                    ))}
                </Select>
                <Select
                    defaultSelectedKeys={[`${payMethod}`]}
                    label="Método de pago"
                    onChange={(e) => setPayMethod(e.target.value)}
                    value={newPayMethod}
                    isRequired
                    className="m-1"
                >
                    {payMethodItems.map((payMethodItem) => (
                        <SelectItem key={payMethodItem.value} value={payMethodItem.value}>
                            {payMethodItem.label}
                        </SelectItem>
                    ))}
                </Select>
                <Button type="submit"
                    className="mt-2 
                    w-1/2.5 
                    self-center trnap-3 
                    transition-colors 
                    duration-300 
                    ease-in-out 
                    hover:bg-columbia-blue-hover 
                    bg-teal 
                    text-white 
                    font-bold">
                    Actualizar Movimiento
                </Button>
            </form>
        </div>
    )
}