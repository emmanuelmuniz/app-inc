"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function UserInfo() {

    const { data: session } = useSession();

    return (
        <div className="grid place-items-center h-screen">
            <div className="p-8 flex-col gap-2 my-6">
                <div className="">
                    Nombre: <span className="font-bold">{session?.user?.name}</span>
                </div>
                <div className="">
                    Email: <span className="font-bold">{session?.user?.email}</span>
                </div>
                <button
                    onClick={() => signOut()}
                    className="">Cerrar sesión
                </button>
            </div>
        </div>
    )
}