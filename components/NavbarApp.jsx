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
            <Navbar className="rounded-lg bg-gunmetal">
                <NavbarBrand>
                    <Link className="text-white font-bold text-lg" href={'/'}>Finance Tracker</Link>
                </NavbarBrand>
                <NavbarContent justify="end">
                    <NavbarItem className="text-white font-bold mx-2">
                        <Link href={'/pages/addMove'}>Crear Movimiento</Link>
                    </NavbarItem>
                    <NavbarItem className="text-white font-bold mx-2">
                        <Link href={'/pages/categories'}>Categorías</Link>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>

            {/* <nav className="flex justify-between items-center
        bg-gunmetal px-8 py-3 rounded-lg overflow-hidden">
                <Link className="text-white font-bold" href={'/'}>Finance Tracker</Link>
                <Link className="p-2 
                rounded-lg 
                bg-teal 
                overflow-hidden 
                text-white 
                font-bold 
                text-sm 
                transition-colors
                duration-300 
                ease-in-out 
                hover:bg-teal-hover"
                    href={'/pages/addMove'}>Crear Movimiento</Link>
            </nav> */}
        </>
    )
}