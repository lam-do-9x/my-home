import { useState, useEffect } from "react";
import { PlusSmIcon, AdjustmentsIcon } from "@heroicons/react/outline";
import Layout from "../../../components/cp/Layout";
import { generateRandomWord } from "../../../lib/randomWord";

export default function Improv() {
  const [randomWord, setRandomWord] = useState("");
  const [time, setTime] = useState(0);

  const tick = () => {
    if (time === 0) {
      setTime(0);
      return;
    }

    if (time > 0) {
      setTime(time - 1);
    }
  };

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  function getRandom() {
    const word = generateRandomWord();
    setRandomWord(word);
    setTime(60);
  }

  return (
    <Layout>
      <div className="flex mx-6 my-6">
        <h2 className="mr-4 text-lg font-large uppercase rounded border p-4">
          Improv
        </h2>
      </div>
      <div className="flex mx-6 my-6">
        <div className="flex flex-col justify-center items-center w-1/3 border mr-4 p-4">
          <h3 className="font-medium uppercase p-2 border-b my-2">
            Random Word Generator
          </h3>
          {randomWord.length !== 0 && (
            <p className="my-2 p-4 border rounded" key={randomWord}>
              {randomWord}
            </p>
          )}
          {randomWord.length !== 0 && (
            <p>
              {time === 0 ? `countdown's over` : `${time} seconds remaining`}
            </p>
          )}
          <button
            className="flex items-center justify-center border my-2 p-2 rounded-full focus:outline-none"
            onClick={getRandom}
          >
            <PlusSmIcon className="h-5 w-5" />
            Generate
          </button>
        </div>
        <table className="min-w-min w-2/3 table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal text-center">
              <th className="py-3 px-6 text-center">word</th>
              <th className="py-3 px-6 text-center">content</th>
              <th className="py-3 px-6 flex justify-center">
                <AdjustmentsIcon className="h-6 w-6" />
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light"></tbody>
        </table>
      </div>
    </Layout>
  );
}
