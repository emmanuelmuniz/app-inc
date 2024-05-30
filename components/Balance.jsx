
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

    return (
        <>
            <h1 className="m-2 text-3xl "><span className="font-bold mr-1">Balance: </span>{formatter.format(summary.balance)}</h1>
            <h1 className="m-2 text-xl"><span className="font-bold mr-1">Ingresos: </span>{formatter.format(summary.income)}</h1>
            <h2 className="m-2 text-xl"><span className="font-bold mr-1">Egresos: </span>{formatter.format(summary.expenses)}</h2>
        </>
    );
}