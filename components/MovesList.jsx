"use client"

import { useState, useEffect, useMemo } from 'react';
import { HiPencilAlt, HiChevronDown } from 'react-icons/hi';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";
import { Pagination } from "@nextui-org/pagination";
import { useSortCategoriesByName } from "@/app/hooks/useSortCategoriesByName";
import { DateRangePicker } from "@nextui-org/date-picker";

import { GetMoves } from '../app/api/moves/requests'
import { GetCategories } from '../app/api/categories/requests'

import RemoveButton from '@/components/RemoveButton'
import LoadingDisplay from '@/components/LoadingDisplay'
import MoveModal from '@/components/moveModal/MoveModal'
import Link from "next/link"
import Balance from '@/components/Balance'

import { moveTypes, payMethods } from "@/app/data/Data.js"
import Formatter from "@/app/utils/AmountFormatter"

import { parseDate, getLocalTimeZone, today } from "@internationalized/date";

import './styles.css';

export default function MovesList() {
    const [moves, setMoves] = useState([]);
    const [categories, setCategories] = useState([]);
    const categoriesOptions = useSortCategoriesByName(categories);
    const [moveTypeOptions, setMoveTypeOptions] = useState(moveTypes);
    const [payMethodOptions, setPayMethodOptions] = useState(payMethods);

    const [isLoading, setIsLoading] = useState(true);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [moveTypeFilter, setMoveTypeFilter] = useState("all");
    const [payMethodFilter, setPayMethodFilter] = useState("all");

    const [selectedElement, setSelectedElement] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [startDate, setStartDate] = useState(today(getLocalTimeZone()).subtract({ days: 7 }));
    const [endDate, setEndDate] = useState(today(getLocalTimeZone()));

    // const { data: session } = useSession({ required: true });

    // Get Moves and categories
    useEffect(() => {
        const fetchData = async () => {
            await GetMoves(today(getLocalTimeZone()).subtract({ days: 7 }), today(getLocalTimeZone()))
                .then((response) => {
                    setMoves(response.moves);
                    const fetchCategories = async () => {
                        await GetCategories()
                            .then((response) => {
                                setCategories(response.categories);
                                setIsDataLoaded(true);
                                setIsLoading(false);
                            });
                    };
                    fetchCategories();
                }, []);
        };
        fetchData();
    }, []);

    const handleDateChange = (startDate, endDate) => {
        if (startDate && endDate) {
            const fetchData = async () => {
                await GetMoves(startDate, endDate)
                    .then((response) => {
                        setMoves(response.moves);
                    }, []);
            };
            fetchData();
        }
    };

    // Filters
    const filteredItems = useMemo(() => {
        let filteredMoves = [...moves];

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

    // Fill cells if rows are less than rows per page
    const filledMoves = [...movesToShowInPage];
    while (filledMoves.length < rowsPerPage) {
        filledMoves.push({
            column1: '', column2: '', column3: '', column4: '',
            column5: '', column6: '', column7: ''
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

    const handleSelectedElement = (element) => {
        setSelectedElement(element);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedElement(null);
    };
    return (
        <>
            {isLoading && <LoadingDisplay />}
            {isDataLoaded &&
                <div className="max-w-* rounded-md overflow-hidden onClick">
                    <div className="relative flex justify-between items-center gap-2 p-3 pl-0 pr-0">
                        <div className="flex-shrink-0">
                            <DateRangePicker
                                label="Rango de Fechas"
                                color='primary'
                                onChange={(range) => handleDateChange(range.start, range.end)}
                                defaultValue={{
                                    start: today(getLocalTimeZone()).subtract({ days: 7 }),
                                    end: today(getLocalTimeZone())
                                }}
                            />
                        </div>
                        <div className="flex gap-2">
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button className='bg-teal text-white' radius='sm'>
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
                                    <Button className='bg-teal text-white' radius='sm'>
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
                                    <Button className='bg-teal text-white' radius='sm'>
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
                    </div>

                    <div className='max-w-* h-100vh rounded-md overflow-hidden'>
                        <table className='w-full table-auto rounded-md overflow-hidden h-full'>
                            <thead className=''>
                                <tr className='text-white  text-md bg-teal rounded-sm'>
                                    <th key={"date"} className='font-normal p-3 pl-6 text-left'>Fecha</th>
                                    <th key={"amount"} className='font-normal p-3 text-left'>Monto</th>
                                    <th key={"moveType"} className='font-normal p-3 text-left'>Tipo de mov.</th>
                                    <th key={"payMethod"} className='font-normal p-3 text-left'>Medio de pago</th>
                                    <th key={"category"} className='font-normal p-3 text-left'>Categoría</th>
                                    <th key={"detail"} className='font-normal p-3 text-left'>Detalle</th>
                                    <th key={"actions"} className='font-normal p-3 pr-6 text-center'>Acciones</th>
                                </tr>
                            </thead>
                            <tbody className='h-100'>
                                {filledMoves.slice(0, rowsPerPage).map(m => (
                                    <tr key={m._id} style={m.detail ? { cursor: 'pointer' } : {}}
                                        className='move-row border-slate-300 transition-colors duration-300 ease-in-out hover:bg-columbia-blue  odd:bg-silver even:bg-white'>
                                        <td className='p-3 pl-6 text-left text-sm' onClick={() => m.detail && handleSelectedElement(m)}>{m.date}</td>
                                        <td className='p-3 text-left text-sm' onClick={() => m.detail && handleSelectedElement(m)}>
                                            {(m.amount ? Formatter.format(m.amount) : '')}
                                        </td>
                                        <td className='p-3 text-left text-sm' onClick={() => m.detail && handleSelectedElement(m)}>{m.moveType}</td>
                                        <td className='p-3 text-left text-sm' onClick={() => m.detail && handleSelectedElement(m)}>{m.payMethod}</td>
                                        <td className='p-3 text-left text-sm' onClick={() => m.detail && handleSelectedElement(m)}>{m.category ? m.category.category : ''}</td>
                                        <td className='p-3 text-left fixed-column text-sm' onClick={() => m.detail && handleSelectedElement(m)}>{m.detail ? adjustCellContent(m.detail, fixedColumnLength) : ''}</td>

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

                        {selectedElement &&
                            <MoveModal
                                isModalOpen={isModalOpen}
                                move={selectedElement}
                                onClose={handleCloseModal} />
                        }

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
                    <div className="bg-white rounded-lg mb-10">
                        <Balance moveList={filteredItems} />
                    </div>
                </div>}
        </>
    );
} 