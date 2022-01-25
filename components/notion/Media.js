export const Bookmarks = ({ value }) => {
  return (
    <a
      href={value.url}
      className="!important mb-4 no-underline"
      target="_blank"
      rel="noreferrer"
    >
      <div className="border border-gray-300 p-8">{value.url}</div>
    </a>
  );
};

export const Video = ({ value }) => {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const id = value[value.type].url.match(regExp);
  return (
    <iframe
      src={`https://youtube.com/embed/${id[7]}`}
      width="100%"
      height="400"
    ></iframe>
  );
};
