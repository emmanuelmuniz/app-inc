"use client";

import React from 'react'
import { useState } from "react"
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useSession } from "next-auth/react";
import "./styles.css";

export default function     LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();
    const { data: session, update } = useSession();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await signIn("credentials", {
                email, password, redirect: false,
            });

            if (res.error) {
                setError("Credenciales incorrectas");
                return;
            }

            router.push("/pages/moves");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 text-center">
            <div className="mb-4 p-4 rounded-lg bg-lavender">
                <h1 className="text-2xl font-semibold text-teal my-4">Iniciar sesión</h1>
                <form onSubmit={handleSubmit} className="">
                    <Input
                        onChange={e => setEmail(e.target.value)}
                        type="text"
                        placeholder="Email"
                        className="p-2"
                    />
                    <Input
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        placeholder="Contraseña"
                        className="p-2"
                    />
                    <Button type="submit" className="my-4 bg-teal font-semibold text-white rounded-lg">Ingresar</Button>
                </form>
            </div>
            {error && (
                <div className="bg-red-500 font-semibold text-white rounded-md mt-2 p-2 px-3 w-fit text-sm">
                    {error}
                </div>
            )}
        </div>
    );
}