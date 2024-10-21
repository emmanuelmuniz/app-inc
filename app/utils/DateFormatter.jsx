const FormatDate = (dateString) => {
    // Expresión regular para coincidir con varios formatos de fecha
    const regex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;

    // Intentar coincidir con la cadena de fecha
    const match = dateString.match(regex);

    if (!match) {
        throw new Error('Fecha no válida');
    }

    // Extraer día, mes y año del resultado de la coincidencia
    let [, day, month, year] = match;

    // Asegurar que el día y el mes tengan dos dígitos
    day = day.padStart(2, '0');
    month = month.padStart(2, '0');

    // Devolver la fecha en formato DD-MM-YYYY
    return `${day}-${month}-${year}`;
}

export default FormatDate;