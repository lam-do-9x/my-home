export const Bookmarks = ({ value }) => {
  return (
    <a
      href={value.url}
      className="no-underline !important mb-4"
      target="_blank"
      rel="noreferrer"
    >
      <div className="border border-gray-300 p-8">{value.url}</div>
    </a>
  );
};
