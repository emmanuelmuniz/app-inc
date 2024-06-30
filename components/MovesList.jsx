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
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { Pagination } from "@nextui-org/pagination";
// import { useSession } from "next-auth/react";

import './styles.css';

export default function MovesList() {
    const [moves, setMoves] = useState([]);
    const [categoriesOptions, setCategoriesOptions] = useState([]);
    const [moveTypeOptions, setMoveTypeOptions] = useState([]);
    const [payMethodOptions, setPayMethodOptions] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [moveTypeFilter, setMoveTypeFilter] = useState("all");
    const [payMethodFilter, setPayMethodFilter] = useState("all");

    // const { data: session } = useSession({ required: true });

    // Get Moves and categories
    useEffect(() => {
        const fetchData = async () => {
            await GetMoves()
                .then((response) => {
                    setMoves(response.moves);

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

        setPayMethodOptions([
            { value: "Banco BBVA", label: "Banco BBVA" },
            { value: "Efectivo", label: "Efectivo" },
            { value: "MP INC.", label: "MP INC." },
            { value: "MP Marcos", label: "MP Marcos" }
        ]);

        fetchData();
    }, []);

    // Sort data by date
    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('-');
        return new Date(`${year}-${month}-${day}`);
    };

    // Función para ordenar los datos por fecha
    const sortByDateMoves = useMemo(() => {
        const sortedData = [...moves].sort((b, a) => {
            const dateA = parseDate(a.date);
            const dateB = parseDate(b.date);
            return dateA - dateB;
        });

        return sortedData;
    });


    // Filters
    const filteredItems = useMemo(() => {
        let filteredMoves = [...sortByDateMoves];

        if (moveTypeFilter !== "all" && Array.from(moveTypeFilter).length !== moveTypeOptions.length) {
            filteredMoves = filteredMoves.filter((move) =>
                Array.from(moveTypeFilter).includes(move.moveType)
            );
        }

        if (payMethodFilter !== "all" && Array.from(payMethodFilter).length !== payMethodOptions.length) {
            filteredMoves = filteredMoves.filter((move) =>
                Array.from(payMethodFilter).includes(move.payMethod)
            );
        }

        if (categoryFilter !== "all" && Array.from(categoryFilter).length !== categoriesOptions.length) {
            filteredMoves = filteredMoves.filter((move) =>
                Array.from(categoryFilter).includes(move.category._id)
            );
        }

        return filteredMoves;
    }, [moves, categoryFilter, moveTypeFilter, payMethodFilter]);

    // Pagination
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const movesToShowInPage = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems]);

    const formatter = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
    });

    // Fill cells if rows are less than rows per page
    const filledMoves = [...movesToShowInPage];
    while (filledMoves.length < rowsPerPage) {
        filledMoves.push({
            column1: '',
            column2: '',
            column3: '',
            column4: '',
            column5: '',
            column6: '',
            column7: ''
        });
    }

    // Truncate text if it's very large
    const fixedColumnLength = 20;

    const adjustCellContent = (content, length) => {
        if (content) {
            if (content.length > length) {
                return content.slice(0, length - 3) + '...';
            }
            return content.padEnd(length, ' ');
        };
    }

    return (
        <>
            {isLoading && <LoadingDisplay />}
            {isDataLoaded &&
                <div className="max-w-* rounded-lg overflow-hidden">
                    <div className="relative flex justify-end items-center gap-2 mb-2 p-3 pr-0">
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
                        <Dropdown>
                            <DropdownTrigger>
                                <Button className='bg-teal text-white'>
                                    Medio de pago <HiChevronDown />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Medio de pago"
                                closeOnSelect={false}
                                selectedKeys={payMethodFilter}
                                selectionMode="multiple"
                                onSelectionChange={setPayMethodFilter}
                            >
                                {payMethodOptions.map((payMethod) => (
                                    <DropdownItem key={payMethod.value}>
                                        {payMethod.value}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
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
                    </div>

                    <div className='max-w-* h-100vh rounded-lg overflow-hidden'>
                        <table className='w-full table-auto rounded-lg overflow-hidden h-full'>
                            <thead className=''>
                                <tr className='font-bold text-white bg-teal rounded-sm'>
                                    <th className='p-3 pl-6 text-left'>Fecha</th>
                                    <th className='p-3 text-left'>Monto</th>
                                    <th className='p-3 text-left'>Tipo de mov.</th>
                                    <th className='p-3 text-left'>Medio de pago</th>
                                    <th className='p-3 text-left'>Categoría</th>
                                    <th className='p-3 text-left'>Detalle</th>
                                    <th className='p-3 pr-6 text-center'>Acciones</th>
                                </tr>
                            </thead>
                            <tbody className='h-100'>
                                {filledMoves.slice(0, rowsPerPage).map(m => (
                                    <tr key={m._id} className='move-row border-slate-300 transition-colors duration-300 ease-in-out hover:bg-columbia-blue  odd:bg-white even:bg-silver'>
                                        <td className='p-3 pl-6 text-left'>{m.date}</td>
                                        <td className='p-3 text-left '>
                                            {(m.amount ? formatter.format(m.amount) : '')}
                                        </td>
                                        <td className='p-3 text-left'>{m.moveType}</td>
                                        <td className='p-3 text-left'>{m.payMethod}</td>
                                        <td className='p-3 text-left'>{m.category ? m.category.category : ''}</td>
                                        <td className='p-3 text-left fixed-column'>{m.detail ? adjustCellContent(m.detail, fixedColumnLength) : ''}</td>

                                        <td className='p-3 pr-6 text-center grid grid-cols-2 place-items-center'>
                                            {m.detail && (
                                                <>
                                                    <RemoveButton id={m._id} className='mx-1' />
                                                    <Link className='mx-1 hover:opacity-70 duration-300' href={`/pages/editMove/${m._id}`}>
                                                        <HiPencilAlt title="Editar" size={24} />
                                                    </Link>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <Pagination
                            className='mt-3 grid justify-items-center pagination-bar'
                            isCompact
                            showControls
                            showShadow
                            color="teal"
                            page={page}
                            total={pages}
                            onChange={(page) => setPage(page)}
                        />
                    </div>


                    <Divider className="my-4" />
                    <div className="bg-white p-5 rounded-lg mb-10">
                        <Balance moveList={filteredItems} />
                    </div>
                </div>}
        </>
    );
} 