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
        console.log("---------GETTING MOVES------------")

        return res.json();
    } catch (error) {
        console.log("Error loading moves: ", error);
    }
}

export default async function MovesList() {
    console.log("------------------------------------------")

    const { moves } = await getMoves();

    return (
        <>

            <div className='container mx-auto'>
                <table className='container mx-auto'>
                    <thead>
                        <tr className='font-bold p-8 border border-slate-300 justify-center'>
                            <th className='p-2'>Fecha</th>
                            <th className='p-2'>Monto</th>
                            <th className='p-2'>Tipo de movimiento</th>
                            <th className='p-2'>Detalle</th>
                            <th className='p-2'></th>
                            <th className='p-2'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {moves.map(m => (
                            <tr className='p-4 border border-slate-300 justify-center text-center'>
                                <td className='p-2'>{m.date}</td>
                                <td className='p-2'>{m.amount}</td>
                                <td className='p-2'>{m.moveType}</td>
                                <td className='p-2'>{m.detail}</td>
                                <td className='py-2 px-1 grid grid-cols-2'>
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