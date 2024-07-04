const CVSMoveJSONToDBJSON = (data, user) => {
    return data.map(move => {
        let newMove = {};

        newMove = {
            detail:
                (move['Concepto'] !== undefined ? "Concepto: " + move['Concepto'] + ". " : "") +
                (move['Detalle'] !== undefined ? "Detalle: " + move['Detalle'] : ""),
            date: move['Fecha'],
            amount: Number((move['Crédito'] + move['Débito']).replace(/[,-]/g, '')),
            category: {
                category: "Definir",
                _id: "667d6350063995d05eeab037"
            },
            moveType: 'Ingreso',
            payMethod: "Banco BBVA",
            lastUpdateBy: user
        }

        if (move['Crédito'] == "")
            newMove['moveType'] = "Egreso";

        return newMove;
    });
};

export default CVSMoveJSONToDBJSON;
