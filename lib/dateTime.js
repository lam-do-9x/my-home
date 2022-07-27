const newDate = (dateStr) => (dateStr !== '' ? new Date(dateStr) : new Date())

function formatDateMonthStr(dateStr, option = {}) {
  const date = newDate(dateStr)
  return new Intl.DateTimeFormat('en-US', option).format(date)
}

function formatDate(format, dateStr = '') {
  const date = newDate(dateStr)

  return format
    .replace(/yyyy/g, date.getUTCFullYear().toString())
    .replace(/mm/g, (date.getUTCMonth() + 1).toString().padStart(2, '0'))
    .replace(/dd/g, date.getUTCDate().toString().padStart(2, '0'))
}

export { formatDate, formatDateMonthStr }
