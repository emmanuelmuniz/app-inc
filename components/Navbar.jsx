import Link from "next/link"

export default function Navbar() {
    return(
        <nav className="flex justify-between items-center
        bg-slate-800 px-8 py-3 rounded-lg overflow-hidden">
            <Link className="text-white font-bold" href={'/'}>Finance Tracker</Link>
            <Link className="p-2 rounded-lg bg-primary-400 overflow-hidden text-white text-sm" href={'/pages/addMove'}>Crear Movimiento</Link>
        </nav>
    )
}