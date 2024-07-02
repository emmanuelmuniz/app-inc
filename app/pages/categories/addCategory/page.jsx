"use client"

import React from "react";
import { useState } from "react"
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function AddCategory() {
    const [category, setCategory] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!category) {
            alert("Todos los datos son requeridos para crear un nuevo movimiento.");
        } else {
            try {
                const res = await fetch(`${apiUrl}api/categories`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({ category })
                });

                if (res.ok) {
                    router.push('/pages/categories');
                    router.refresh();
                } else {
                    throw new Error('Failed to create a new Category')
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>
            <div className="flex justify-center bg-lavender rounded-lg p-3">
                <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-3 w-7/12 p-5">
                    <Input
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                        type="text"
                        label="Categoría"
                        className="m-1"
                        isRequired />
                    <Button type="submit" className="mt-2 w-1/2.5 p-3 self-center
                    bg-teal text-white font-semibold 
                    transition-colors duration-300 ease-in-out 
                    hover:bg-columbia-blue-hover ">
                        Crear Categoría
                    </Button>
                </form>
            </div>
        </>
    )
}
