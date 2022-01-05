import { useState, useEffect } from "react";
import {
  PlusSmIcon,
  AdjustmentsIcon,
  PencilAltIcon,
} from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import Layout from "../../../components/cp/Layout";
import { generateRandomWord } from "../../../lib/randomWord";
import UpSetImpov from "../../../components/cp/UpSetImpov";

export default function Improv() {
  const [randomWord, setRandomWord] = useState("");
  const [time, setTime] = useState(0);
  const [isUpSet, setUpSet] = useState(false);
  const [improv, setImprov] = useState([]);

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
        <div className="w-2/3">
          <div className="flex justify-between mb-2">
            <div
              className="p-2 rounded-md shadow border cursor-pointer hover:bg-gray-100"
              onClick={() => setUpSet(true)}
            >
              <PencilAltIcon className="h-6 w-6" />
            </div>
            <label className="relative block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <SearchIcon className="h-5 w-5 fill-gray-300" />
              </span>
              <input
                className="placeholder:italic placeholder:text-gray-400 block bg-white w-full border border-gray-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none sm:text-sm"
                placeholder="Search for content..."
                type="text"
                name="search"
              />
            </label>
          </div>
          <table className="min-w-min w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal text-center">
                <th className="py-3 px-6 text-center">content</th>
                <th className="py-3 px-6 flex justify-center">
                  <AdjustmentsIcon className="h-6 w-6" />
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light"></tbody>
          </table>
          {isUpSet && (
            <UpSetImpov improv={improv} onClick={(improv) => setUpSet(false)} />
          )}
        </div>
      </div>
    </Layout>
  );
}
