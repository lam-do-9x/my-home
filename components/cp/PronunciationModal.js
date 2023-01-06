import { XMarkIcon, PlayIcon } from '@heroicons/react/24/outline'

export default function PronunciationModal(props) {
  function close() {
    props.onClick()
  }

  function play(pronunciation) {
    new Audio(
      `https://www.oxfordlearnersdictionaries.com${pronunciation}`
    ).play()
  }

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center p-7 opacity-100 transition-opacity duration-300">
      <div className="flex h-1/2 max-w-fit flex-col overflow-x-hidden rounded-lg bg-white shadow-2xl">
        <div className="my-2 flex w-full items-center border-b px-7">
          <div className="w-full text-center font-bold text-yellow-500">
            {props.ipa}
          </div>
          <XMarkIcon
            className="h-5 w-5 cursor-pointer fill-current text-gray-700"
            onClick={close}
          />
        </div>
        <div className="my-4 px-7">
          <style jsx>{`
            .columns-4 {
              column-count: 4;
            }
          `}</style>
          <ul
            className={`${
              props.pronunciations.length >= 100 ? 'columns-4' : ''
            }`}
          >
            {props.pronunciations.map((pronounce) => (
              <li className="flex items-center" key={pronounce.word}>
                {pronounce.word}
                <PlayIcon
                  className="h-4 w-4"
                  onClick={() => play(pronounce.pronunciation)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
