import { XIcon, PlayIcon } from "@heroicons/react/outline";

export default function PronunciationModal(props) {
  function close() {
    props.onClick();
  }

  function play(pronunciation) {
    new Audio(
      `https://www.oxfordlearnersdictionaries.com${pronunciation}`
    ).play();
  }

  return (
    <div className="p-7 flex justify-center items-center fixed left-0 top-0 w-full h-full z-50 transition-opacity duration-300 opacity-100">
      <div className="bg-white flex flex-col rounded-lg h-1/2 max-w-fit overflow-x-hidden shadow-2xl">
        <div className="px-7 flex items-center w-full my-2 border-b">
          <div className="text-yellow-500 font-bold w-full text-center">
            {props.ipa}
          </div>
          <XIcon
            className="fill-current text-gray-700 w-5 h-5 cursor-pointer"
            onClick={close}
          />
        </div>
        <div className="px-7 my-4">
          <style jsx>{`
            .columns-4 {
              column-count: 4;
            }
          `}</style>
          <ul
            className={`${
              props.pronunciations.length >= 100 ? "columns-4" : ""
            }`}
          >
            {props.pronunciations.map((pronounce) => (
              <li className="flex items-center" key={pronounce.word}>
                {pronounce.word}
                <PlayIcon
                  className="h-5 w-5"
                  onClick={() => play(pronounce.pronunciation)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
