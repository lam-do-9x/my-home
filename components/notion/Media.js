import Images from '@components/Images'

export const Bookmarks = ({ value }) => {
  return (
    <a
      href={value.url}
      className="!important mb-4 no-underline"
      target="_blank"
      rel="noreferrer"
    >
      <div className="flex w-full justify-between border border-gray-300">
        <div className="w-2/3 p-4">
          <p className="my-0 text-base font-normal">{value.title}</p>
          <p className="my-2 text-sm font-thin text-gray-700">
            {value.description}
          </p>
          <div className="flex">
            <Images src={value.favicons[0]} width="32" height="32" />
            <p className="my-0 mx-2 text-base font-normal">{value.url}</p>
          </div>
        </div>
        <Images
          src={value.images[0]}
          width="250"
          height="106"
          className="w-1/3"
        />
      </div>
    </a>
  )
}

export const Video = ({ value }) => {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  const id = value[value.type].url.match(regExp)
  return (
    <iframe
      src={`https://youtube.com/embed/${id[7]}`}
      width="100%"
      height="400"
    ></iframe>
  )
}
