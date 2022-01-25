import { useEffect, useRef } from "react";
import { monthDate } from "../../lib/dateTime";

const transformWordInWeek = (words) => {
  return words.reduce((transform, word) => {
    let dateMonth = monthDate(new Date(word.contentAt));

    const isExist = transform.find((w) => w.dateMonth === dateMonth);

    if (!isExist) {
      transform.push({ dateMonth, data: [word] });
    } else {
      isExist["data"].push(word);
    }

    return transform;
  }, []);
};

export default function WordInDays(props) {
  const wordInWeek = transformWordInWeek(props.words);
  const nodeRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      nodeRef.current &&
      !nodeRef.current.contains(event.target) &&
      props.showModal === false
    ) {
      props.onClick(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  function onClickWord(id) {
    props.onClick(true, id);
  }

  return (
    <div
      className={`fixed right-0 top-0 flex items-center ${
        props.words.length !== 0 ? "" : "hidden"
      }`}
      ref={nodeRef}
    >
      <div className="rounded bg-white shadow-lg">
        <div className="flex p-1">
          {wordInWeek.map((word) => (
            <div key={word.dateMonth} className="mx-2 text-center">
              <h3 className="font-bold">{word.dateMonth}</h3>
              {word.data.map((w) => (
                <p
                  key={w.word}
                  className="cursor-pointer rounded-lg hover:bg-gray-200"
                  onClick={() => onClickWord(w.id)}
                >
                  {w.word}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
