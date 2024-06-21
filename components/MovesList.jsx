"use client"

import RemoveButton from '@/components/RemoveButton'
import LoadingDisplay from '@/components/LoadingDisplay'
import Link from "next/link"
import { HiPencilAlt, HiChevronDown } from 'react-icons/hi';
import { GetMoves } from '../app/api/moves/requests'
import { GetCategories } from '../app/api/categories/requests'

import Balance from '@/components/Balance'
import { Divider } from "@nextui-org/divider";
import { useState, useEffect, useMemo } from 'react';
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";


export default function MovesList() {
    const [moves, setMoves] = useState([]);
    const [categoriesOptions, setCategoriesOptions] = useState([]);
    const [moveTypeOptions, setMoveTypeOptions] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [moveTypeFilter, setMoveTypeFilter] = useState("all");

    useEffect(() => {
        const fetchData = async () => {
            await GetMoves()
                .then((response) => {
                    setMoves(response.moves)

                    const fetchCategories = async () => {
                        await GetCategories()
                            .then((response) => {
                                setCategoriesOptions(response.categories)
                                setIsDataLoaded(true);
                                setIsLoading(false);
                            })
                    };

                    fetchCategories();
                }, []);
        };

        setMoveTypeOptions([
            { value: "Ingreso", label: "Ingreso" },
            { value: "Egreso", label: "Egreso" }
        ]);

        fetchData();
    }, []);

    const filteredItems = useMemo(() => {
        let filteredMoves = [...moves];

        if (moveTypeFilter !== "all" && Array.from(moveTypeFilter).length !== moveTypeOptions.length) {
            filteredMoves = filteredMoves.filter((move) =>
                Array.from(moveTypeFilter).includes(move.moveType)
            );
        }

        if (categoryFilter !== "all" && Array.from(categoryFilter).length !== categoriesOptions.length) {
            filteredMoves = filteredMoves.filter((move) =>
                Array.from(categoryFilter).includes(move.category._id)
            );
        }

        return filteredMoves;
    }, [moves, categoryFilter, moveTypeFilter]);

    const formatter = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
    });

    return (
        <>
            {isLoading && <LoadingDisplay />}
            {isDataLoaded &&
                <div className="max-w-* rounded-lg overflow-hidden">
                    <div className="relative flex justify-end items-center gap-2 mb-2 ">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button className='bg-teal text-white'>
                                    Categorías <HiChevronDown />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Categorías"
                                closeOnSelect={false}
                                selectedKeys={categoryFilter}
                                selectionMode="multiple"
                                onSelectionChange={setCategoryFilter}
                            >
                                {categoriesOptions.map((category) => (
                                    <DropdownItem key={category._id}>
                                        {category.category}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>

                        <Dropdown>
                            <DropdownTrigger>
                                <Button className='bg-teal text-white'>
                                    Tipo de Movimiento <HiChevronDown />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Tipo de Movimiento"
                                closeOnSelect={false}
                                selectedKeys={moveTypeFilter}
                                selectionMode="multiple"
                                onSelectionChange={setMoveTypeFilter}
                            >
                                {moveTypeOptions.map((moveType) => (
                                    <DropdownItem key={moveType.value}>
                                        {moveType.value}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>

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
                                {filteredItems.map(m => (
                                    <tr key={m._id} className='border-slate-300 transition-colors duration-300 ease-in-out hover:bg-columbia-blue  odd:bg-white even:bg-lavender'>
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
                        <Balance moveList={filteredItems} />
                    </div>
                </div>}
        </>
    );
} 