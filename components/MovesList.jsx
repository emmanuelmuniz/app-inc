import RemoveButton from '@/components/RemoveButton'
import Link from "next/link"
import { HiPencilAlt } from 'react-icons/hi';
import { GetMoves } from '../app/api/moves/requests'
import Balance from '@/components/Balance'
import { Divider } from "@nextui-org/divider";

export default async function MovesList() {
    const { moves } = await GetMoves();

    const formatter = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
    });

    return (
        <>
            <div className='max-w-* rounded-lg overflow-hidden'>
                <table className='w-full table-auto'>
                    <thead className=''>
                        <tr className='font-bold text-white bg-teal rounded-sm'>
                            <th className='p-3 text-left'>Fecha</th>
                            <th className='p-3 text-left'>Monto</th>
                            <th className='p-3 text-left'>Tipo de mov.</th>
                            <th className='p-3 text-left'>Categoría</th>
                            <th className='p-3 text-left'>Detalle</th>
                            <th className='p-3 text-left'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {moves.map(m => (
                            <tr className='border-slate-300 transition-colors duration-300 ease-in-out hover:bg-columbia-blue  odd:bg-white even:bg-lavender'>
                                <td className='p-3 text-left'>{m.date}</td>
                                <td className='p-3 text-left'>
                                    {formatter.format(m.amount)}
                                </td>
                                <td className='p-3 text-left'>{m.moveType}</td>
                                <td className='p-3 text-left'>{m.category.category}</td>
                                <td className='p-3 text-left'>{m.detail}</td>
                                <td className='p-3 text-left grid grid-cols-2'>
                                    <RemoveButton id={m._id} className='mx-1' />
                                    <Link className='mx-1 hover:opacity-70 duration-300' href={`/pages/editMove/${m._id}`}>
                                        <HiPencilAlt title="Editar" size={24} />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Divider className="my-4" />
            <div className="">
                <Balance moveList={moves} />
            </div>
        </>
    );
} 