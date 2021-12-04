const renderText = (value, type) => {
  const {
    annotations: { bold, code, color, italic, strikethrough, underline },
    text,
  } = value;
  return (
    <span
      className={[
        bold ? "font-bold" : "",
        code ? "font-mono bg-gray-200 rounded-sm" : "",
        italic ? "italic" : "",
        strikethrough ? "line-through" : "",
        underline ? "underline" : "",
      ].join(" ")}
      style={color !== "default" ? { color } : {}}
      key={type}
    >
      {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
    </span>
  );
};

export const Text = ({ text, type }) => {
  if (!text) {
    return null;
  }
  if (!Array.isArray(text)) {
    return renderText(text, type);
  }
  return text.map((value) => {
    return renderText(value, type);
  });
};
