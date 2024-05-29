import RemoveButton from '@/components/RemoveButton'
import Link from "next/link"
import { HiPencilAlt } from 'react-icons/hi';

const getMoves = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/moves', {
            cache: 'no-store'
        });

        if (!res.ok) {
            throw new Error("Failed to fetch moves.");
        }

        return res.json();
    } catch (error) {
        console.log("Error loading moves: ", error);
    }
}

export default async function MovesList() {
    const { moves } = await getMoves();

    return (
        <>
            <div className='container mx-auto rounded-lg overflow-hidden'>
                <table className='container mx-auto table-auto '>
                    <thead className=''>
                        <tr className='font-bold bg-slate-300 rounded-sm'>
                            <th className='p-3 text-left'>Fecha</th>
                            <th className='p-3 text-left'>Monto</th>
                            <th className='p-3 text-left'>Tipo de movimiento</th>
                            <th className='p-3 text-left'>Detalle</th>
                            <th className='p-3 text-left'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {moves.map(m => (
                            <tr className='border-slate-300 hover:bg-violet-100  odd:bg-white even:bg-slate-50'>
                                <td className='p-3 text-left'>{m.date}</td>
                                <td className='p-3 text-left'>{m.amount}</td>
                                <td className='p-3 text-left'>{m.moveType}</td>
                                <td className='p-3 text-left'>{m.detail}</td>
                                <td className='p-3 text-left grid grid-cols-2'>
                                    <RemoveButton id={m._id} className='mx-1' />
                                    <Link className='mx-1' href={`/pages/editMove/${m._id}`}>
                                        <HiPencilAlt size={24} />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
} 