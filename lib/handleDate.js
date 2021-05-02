function dateMonthYear(date) {
    const day = date.getDate() + 1 < 10 ? `0${date.getDate()}` : date.getDate();
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const year = date.getFullYear();
    return {day, month, year};
}

function compareDate(date) {
    const { day, month, year } = dateMonthYear(date);
    return new Date(year, month, day);
}

function formatDate(date) {
    const { day, month, year } = dateMonthYear(date);
    return `${day}-${month}-${year}`;
}

export { compareDate, formatDate };
