function monthDate(date) {
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getUTCDate().toString().padStart(2, "0");
  return `${month} ${day}`;
}

function formatDate(format, dateStr = "") {
  const date = dateStr !== "" ? new Date(dateStr) : new Date();
  return format
    .replace(/yyyy/g, date.getUTCFullYear().toString())
    .replace(/mm/g, (date.getUTCMonth() + 1).toString().padStart(2, "0"))
    .replace(/dd/g, date.getUTCDate().toString().padStart(2, "0"));
}

export { formatDate, monthDate };
