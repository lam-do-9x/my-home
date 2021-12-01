function dateMonthYear(date) {
  const day = date.getDate() + 1 < 10 ? `0${date.getDate()}` : date.getDate();
  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const year = date.getFullYear();
  return { day, month, year };
}

function compareDate(date) {
  const { day, month, year } = dateMonthYear(date);
  return new Date(year, month, day);
}

function formatDate(date) {
  const newDate = new Date(date);
  const { day, month, year } = dateMonthYear(newDate);
  return `${day}-${month}-${year}`;
}

function monthDate(date) {
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate() + 1 < 10 ? `0${date.getDate()}` : date.getDate();
  return `${month} ${day}`;
}

export { compareDate, formatDate, monthDate };
