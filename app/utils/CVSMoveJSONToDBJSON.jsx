const CVSMoveJSONToDBJSON = (data) => {
    return data.map(move => {
        let newMove = {};

        newMove = {
            detail: "Detalle: " + move['Detalle'] + " Concepto: " + move['Concepto'] + ".",
            date: move['Fecha'],
            amount: Number((move['Crédito'] + move['Débito']).replace(/[,-]/g, '')),
            category: {
                category: "Definir",
                _id: "667d6350063995d05eeab037"
            },
            moveType: 'Ingreso',
            payMethod: "Banco BBVA"
        }

        if (move['Crédito'] == "")
            newMove['moveType'] = "Egreso";

        return newMove;
    });
};

export default CVSMoveJSONToDBJSON;
