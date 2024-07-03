import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react"

function calculateFinancialSummary(movements) {
    let balance = 0;
    let income = 0;
    let expenses = 0;

    for (const movement of movements) {
        if (movement.moveType === 'Ingreso') {
            income += movement.amount;
        } else if (movement.moveType === 'Egreso') {
            expenses += movement.amount;
        }
    }

    balance = income - expenses;

    return {
        balance,
        income,
        expenses,
    };
}

export default function Balance({ moveList }) {
    const moves = moveList;
    const summary = calculateFinancialSummary(moves);
    const formatter = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS'
    });

    const [isVisible, setIsVisible] = useState(false);

    const handleVision = (e) => {
        e.preventDefault();

        isVisible == true
            ? setIsVisible(false)
            : setIsVisible(true);
    }

    return (
        <>
            <div className="">
                <div className="">
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
                </div>
            </div >
        </>
    );
}
