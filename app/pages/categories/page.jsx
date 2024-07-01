import { Button } from "@nextui-org/button";
import Link from "next/link"
import { GetCategories } from '../../api/categories/requests'
import { HiPencilAlt } from 'react-icons/hi';
import RemoveCategory from '@/components/categories/RemoveCategory'

export default async function Categories() {
    const { categories } = await GetCategories();

    return (
        <div>
            <div className="flex w-full justify-center">
                <table className="w-1/3 table-auto rounded-lg overflow-hidden m-2">
                    <thead>
                        <tr className='font-bold text-white bg-teal rounded-sm'>
                            <th key={"category"} className="p-3 pl-5 text-left">Categoria</th>
                            <th key={"actions"} className="p-2 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(category => (
                            <tr key={category._id} className='text-left border-slate-300  transition-colors duration-300 ease-in-out hover:bg-columbia-blue  odd:bg-white even:bg-lavender'>
                                <td className='p-3 pl-5 text-left'>
                                    {category.category}
                                </td>
                                <td className='p-2 text-center grid grid-cols-2 mt-1'>
                                    <RemoveCategory id={category._id} className='mx-1' />
                                    <Link className='mx-1 hover:opacity-70 duration-300 flex justify-center' href={`/pages/categories/${category._id}`}>
                                        <HiPencilAlt title="Editar" size={24} />
                                    </Link>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>

                <Button type="submit" className="w-1/2.5 m-2 py-3
                    bg-teal text-white font-bold 
                    transition-colors duration-300 ease-in-out 
                    hover:bg-columbia-blue-hover ">
                    <Link href={'/pages/categories/addCategory'}>Crear Categoría</Link>
                </Button>
            </div>
        </div>
    )
}