"use client"

import Link from "next/link"
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem
} from "@nextui-org/navbar";
import { useSession } from "next-auth/react";

export default function NavbarApp() {
    const { data: session } = useSession();

    return (
        <>
            {session && (
                <Navbar className="rounded-lg bg-teal mt-4 px-0">
                    <NavbarBrand>
                        <Link className="text-white font-bold text-lg" href={'/pages/moves'}>Finance Tracker</Link>
                    </NavbarBrand>
                    <NavbarContent justify="end" className="-mr-1">
                        <NavbarItem className="text-white font-bold mx-2">
                            <Link href={'/pages/addMove'}>Crear Movimiento</Link>
                        </NavbarItem>
                        <NavbarItem className="text-white font-bold mx-2">
                            <Link href={'/pages/categories'}>Categorías</Link>
                        </NavbarItem>
                        <NavbarItem className="text-white font-bold ml-2">
                            <Link href={'/pages/fileImport'}>Importar Movimientos</Link>
                        </NavbarItem>
                    </NavbarContent>
                </Navbar>
            )}
        </>
    )
}