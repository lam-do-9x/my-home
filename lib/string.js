export function getContentByField(str, field, end = '') {
  return str.substring(
    str.lastIndexOf(field) + field.length,
    str.lastIndexOf(end)
  )
}

export function getStringBeforeCharacter(str, char) {
  return str.substr(0, str.indexOf(char))
}
