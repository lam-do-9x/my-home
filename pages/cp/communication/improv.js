import { useState, useEffect } from "react";
import {
  PlusSmIcon,
  AdjustmentsIcon,
  RefreshIcon,
} from "@heroicons/react/outline";
import Layout from "../../../components/cp/Layout";
import { RandomWord } from "../../../lib/randomWord";

export default function Improv() {
  const [number, setNumber] = useState(1);
  const [randomWords, setRandomWords] = useState([]);

  useEffect(() => {
    getRandom();
  }, []);

  function getRandom() {
    const words = new RandomWord(Number(number)).get();
    setRandomWords(words);
  }

  return (
    <Layout>
      <div className="flex mx-6 my-6">
        <h2 className="mr-4 text-lg font-large uppercase rounded border p-4">
          Improv
        </h2>
      </div>
      <div className="flex mx-6 my-6 justify-center align-center">
        <div className="w-1/3">
          <div className="flex mb-4">
            <h3 className="my-2 font-medium uppercase mr-2">
              Random Word Generator
            </h3>
            <a
              className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-500 text-center font-bold rounded px-1"
              href="https://randomwordgenerator.com/"
              target="_blank"
              rel="noreferrer"
            >
              <RefreshIcon className="h-5 w-5 mx-2" />
              Random Word
            </a>
          </div>
          <div className="flex justify-center items-center">
            <input
              className="w-full border p-2 rounded-sm focus:outline-none text-center"
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
            <button
              className="flex items-center justify-center border mx-2 p-2 rounded-full focus:outline-none"
              onClick={getRandom}
            >
              <PlusSmIcon className="h-5 w-5" />
              Generate
            </button>
          </div>
          <div className="border-t my-2 text-center font-medium">
            {randomWords.map((word) => (
              <p className="my-2" key={word}>
                {word}
              </p>
            ))}
          </div>
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
