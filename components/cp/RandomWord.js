import { useState, useEffect } from "react";
import { PlusSmIcon } from "@heroicons/react/outline";
import { generateRandomWord } from "../../lib/randomWord";

export default function RandomWord() {
  const [randomWord, setRandomWord] = useState("");
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (time <= 0) return;

    const intervalId = setInterval(() => {
      setTime(time - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  });

  function getRandom() {
    const word = generateRandomWord();
    setRandomWord(word);
    setTime(60);
  }

  return (
    <div className="mr-4 w-1/3 my-6">
      <div className="flex flex-col justify-center items-center h-fit border p-4 my-8">
        <h3 className="font-medium uppercase p-2 border-b my-2">
          Random Word Generator
        </h3>
        {randomWord.length !== 0 && (
          <p className="my-2 p-4 border rounded" key={randomWord}>
            {randomWord}
          </p>
        )}
        {randomWord.length !== 0 && (
          <p>{time === 0 ? `countdown's over` : `${time} seconds remaining`}</p>
        )}
        <button
          className="flex items-center justify-center border my-2 p-2 rounded-full focus:outline-none"
          onClick={getRandom}
        >
          <PlusSmIcon className="h-5 w-5" />
          Generate
        </button>
      </div>
    </div>
  );
}
