import { useMemo } from 'react';

export const usePayMethodBalances = (moves, payMethods) => {
    return useMemo(() => {
        const balances = [];
        let totalIncome = 0;
        let totalExpense = 0;

        payMethods.forEach(method => {
            const filteredMoves = moves.filter(
                m => m.payMethod === method.value
            );

            const income = filteredMoves
                .filter(m => m.moveType === 'Ingreso')
                .reduce((sum, m) => sum + m.amount, 0);

            const expense = filteredMoves
                .filter(m => m.moveType === 'Ingreso')
                .reduce((sum, m) => sum + m.amount, 0);

            balances.push({
                method,
                income,
                expense,
                balance: income - expense,
            });

            totalIncome += income;
            totalExpense += expense;
        });

        balances.unshift({
            method: "Total",
            income: totalIncome,
            expense: totalExpense,
            balance: totalIncome - totalExpense,
        });

        return balances;
    }, [moves, payMethods]);
};
