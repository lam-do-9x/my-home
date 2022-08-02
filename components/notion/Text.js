const renderText = (value) => {
  const {
    annotations: { bold, code, color, italic, strikethrough, underline },
    text,
  } = value

  function hasWhiteSpace() {
    return text.content.indexOf('\n') > -1
  }

  return (
    <span
      className={[
        bold ? 'font-bold' : '',
        code ? 'rounded-sm bg-gray-200 font-mono' : '',
        italic ? 'italic' : '',
        strikethrough ? 'line-through' : '',
        underline ? 'underline' : '',
        hasWhiteSpace() ? 'whitespace-pre-wrap' : '',
      ]
        .join(' ')
        .trim('')}
      style={color !== 'default' ? { color } : {}}
      key={text.content}
    >
      {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
    </span>
  )
}

export const Text = ({ text }) => {
  if (!text) {
    return null
  }
  if (!Array.isArray(text)) {
    return renderText(text)
  }
  return text.map((value) => {
    return renderText(value)
  })
}
