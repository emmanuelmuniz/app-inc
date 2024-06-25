const CVSMoveJSONToDBJSON = (data) => {
    return data.map(move => {
        let newMove = {};

        newMove = {
            detail: "Detalle: " + move['Detalle'] + ". Concepto: " + move['Concepto'] + ".",
            date: move['Fecha'],
            amount: Number((move['Crédito'] + move['Débito']).replace(/[,-]/g, '')),
            category: {
                category: "Banco BBVA",
                _id: "667adbcc43d6d5fa7826e146"
            },
            moveType: 'Ingreso'
        }

        if (move['Crédito'] === "")
            move['moveType'] = "Egreso";



        return newMove;
    });
};

export default CVSMoveJSONToDBJSON;
