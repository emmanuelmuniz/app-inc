"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Button } from "@nextui-org/button";

export default function UserInfo() {
    const { data: session } = useSession({required: true});

    return (
        <>
            {session && (
                <div className="grid place-items-center">
                    <div className="flex-col gap-2 mt-12 bg-lavender p-7 rounded-md">
                        <div className="my-2">
                            Nombre: <span className="font-bold mx-1">{session?.user?.name}</span>
                        </div>
                        <div className="my-2">
                            Email: <span className="font-bold mx-1">{session?.user?.email}</span>
                        </div>
                        <Button
                            onClick={() => signOut()}
                            className="mt-3 font-bold text-white bg-teal">Cerrar sesión
                        </Button>
                    </div>
                </div>
            )
            }
        </>
    )
}