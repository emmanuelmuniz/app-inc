import Link from "next/link"
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem
} from "@nextui-org/navbar";

export default function NavbarApp() {
    return (
        <>
            <Navbar className="rounded-lg bg-teal mt-4 px-0">
                <NavbarBrand>
                    <Link className="text-white font-bold text-lg" href={'/'}>Movimientos</Link>
                </NavbarBrand>
                <NavbarContent justify="end" className="-mr-10">
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
        </>
    )
}