export function getContentByField(str, field, end = '') {
  return str.substring(
    str.lastIndexOf(field) + field.length,
    str.lastIndexOf(end)
  )
}
