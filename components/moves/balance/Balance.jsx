import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { usePayMethodBalances } from "@/app/hooks/usePayMethodBalances";
import { payMethods } from "@/app/data/Data.js";

export default function Balance({ moveList }) {
    const moves = moveList;
    // const summary = calculateFinancialSummary(moves);
    const formatter = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS'
    });

    const balances = usePayMethodBalances(moves, payMethods);

    const [isVisible, setIsVisible] = useState(true);

    const handleVision = (e) => {
        e.preventDefault();

        isVisible == true
            ? setIsVisible(false)
            : setIsVisible(true);
    }

    return (
        <>
            {/* <div className="">
                    {isVisible ? (
                        <div className="">
                            <div className="flex items-center">
                                <h1 className="m-2 text-3xl">
                                    <span className="font-bold">Balance:</span>
                                    <span className="ml-1">{formatter.format(summary.balance)}</span>
                                    <span className="ml-2 cursor-pointer text-md" onClick={handleVision}>
                                        <FaRegEye className="inline-block text-md ml-3 mb-1" />
                                    </span>
                                </h1>
                            </div>
                            <h1 className="m-2 text-xl"><span className="font-bold mr-1">Ingresos: </span>{formatter.format(summary.income)}</h1>
                            <h2 className="m-2 text-xl"><span className="font-bold mr-1">Egresos: </span>{formatter.format(summary.expenses)}</h2>
                        </div>) : (
                        <div className="">
                            <div className="">
                                <div className="flex items-center">
                                    <h1 className="m-2 text-3xl">
                                        <span className="font-bold">Balance:</span>
                                        <span className="ml-1"> ******</span>
                                        <span className="ml-2 cursor-pointer text-md" onClick={handleVision}>
                                            <FaRegEyeSlash className="inline-block text-md ml-3 mb-1" />
                                        </span>
                                    </h1>
                                </div>
                                <h1 className="m-2 text-xl">
                                    <span className="font-bold mr-1">Ingresos: </span>
                                    <span className="mt-10"> ******</span>
                                </h1>
                                <h2 className="m-2 text-xl"><span className="font-bold mr-1">Egresos: </span> ******</h2>
                            </div>
                        </div>)}
                </div> */}

            <div className="container mx-auto p-6 bg-white rounded-md">
                {isVisible ? (
                    <div className="">
                        <div className="w-full flex items-center">
                            <h1 className="text-2xl font-bold mb-4 mt-3">Saldos Totales</h1>
                            <span className="ml-2 cursor-pointer text-xl" onClick={handleVision}>
                                <FaRegEye className="inline-block text-2xl ml-3 mb-1" />
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 rounded-md">
                            {balances.map((item) => (
                                <div key={item.method?.value || item.method} className="bg-silver p-5 rounded-md shadow">
                                    <h2 className="text-xl font-semibold mb-2">{item.method?.label || item.method}</h2>
                                    <ul>
                                        <li className="my-2">Ingreso: {formatter.format(item.income)}</li>
                                        <li className="my-2">Gasto: {formatter.format(item.expense)}</li>
                                        <li className="my-2 font-semibold text-lg">Balance: {formatter.format(item.balance)}</li>
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="">
                        <div className="w-full flex items-center">
                            <h1 className="text-2xl font-bold mb-4 mt-3">Saldos Totales</h1>
                            <span className="ml-2 cursor-pointer text-xl" onClick={handleVision}>
                                <FaRegEyeSlash className="inline-block text-2xl ml-3 mb-1" />
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 rounded-md">
                            {balances.map((item) => (
                                <div key={item.method?.value || item.method} className="bg-silver p-5 rounded-md shadow">
                                    <h2 className="text-xl font-semibold mb-2">{item.method?.label || item.method}</h2>
                                    <ul>
                                        <li className="my-2">Ingreso: *****</li>
                                        <li className="my-2">Gasto: *****</li>
                                        <li className="my-2 font-semibold text-lg">Balance: *****</li>
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
