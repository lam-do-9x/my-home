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

function monthDate(date) {
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate() + 1 < 10 ? `0${date.getDate()}` : date.getDate();
  return `${month} ${day}`;
}

function formatDate(format, dateStr = "") {
  const date = dateStr !== "" ? new Date(dateStr) : new Date();
  return format
    .replace(/yyyy/g, date.getUTCFullYear().toString())
    .replace(/mm/g, (date.getUTCMonth() + 1).toString().padStart(2, "0"))
    .replace(/dd/g, date.getUTCDate().toString().padStart(2, "0"));
}

export { compareDate, formatDate, monthDate };
