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
                <Navbar className="bg-teal rounded-b-md px-0">
                    <NavbarBrand>
                        <Link className="text-white font-semibold text-lg" href={'/pages/moves'}>Finance Tracker</Link>
                    </NavbarBrand>
                    <NavbarContent justify="end" className="-mr-1">
                        <NavbarItem className="text-white font-semibold mx-2 text-sm">
                            <Link href={'/pages/addMove'}>Crear Movimiento</Link>
                        </NavbarItem>
                        <NavbarItem className="text-white font-semibold mx-2 text-sm">
                            <Link href={'/pages/categories'}>Categorías</Link>
                        </NavbarItem>
                        <NavbarItem className="text-white font-semibold ml-2 text-sm">
                            <Link href={'/pages/fileImport'}>Importar Movimientos</Link>
                        </NavbarItem>
                        <NavbarItem className="text-white font-semibold ml-2 text-sm">
                            <Link href={'/pages/dashboard'}>Ver Perfil</Link>
                        </NavbarItem>
                    </NavbarContent>
                </Navbar>
            )}
        </>
    )
}