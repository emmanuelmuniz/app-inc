import Link from "next/link"

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center
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
        </nav>
    )
}