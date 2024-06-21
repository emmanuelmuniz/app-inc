const CVSMoveJSONToDBJSON = (data) => {
    return data.map(move => {
        let newMove = {};

        newMove = {
            detail: "Detalle: " + move['Detalle'] + ". Concepto: " + move['Concepto'] + ".",
            date: move['Fecha'],
            amount: (move['Crédito'] + move['Débito']).replace(/-/g, ""),
            category: '',
            moveType: 'Ingreso'
        }

        if (move['Crédito'] === "")
            move['moveType'] = "Egreso";

        return newMove;
    });
};

export default CVSMoveJSONToDBJSON;
