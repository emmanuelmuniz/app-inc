const FormatDate = (dateString) => {
    const regex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    const match = dateString.match(regex);

    if (!match) {
        throw new Error('Fecha no válida');
    }

    let [, day, month, year] = match;

    day = day.padStart(2, '0');
    month = month.padStart(2, '0');

    return `${day}-${month}-${year}`;
}

export default FormatDate;