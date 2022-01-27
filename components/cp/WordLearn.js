import { useEffect, useState } from "react";
import {
  PencilIcon,
  AdjustmentsIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import Loader from "./Loader";
import Paginate from "./Paginate";
import Modal from "./Modal";

export default function WordLearn() {
  const [isLoading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [dictionaries, setDictionaries] = useState([]);
  const [dictionary, setDictionary] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetchRandom();
    setLoading(false);
  }, [offset]);

  async function fetchRandom() {
    const { dictionaries, pageCount } = await fetch(
      `/api/dictionaries?page=yg&take=5&skip=${offset}`
    ).then((res) => res.json());

    setDictionaries(dictionaries);

    setPageCount(pageCount > 1 ? pageCount : 0);

    return dictionaries;
  }

  async function view(id) {
    const dictionary = dictionaries.find((d) => d.id === id);

    setDictionary(dictionary);

    setShow(true);
  }

  return (
    <div>
      <table className="mr-4 h-fit table-auto rounded shadow-md">
        <thead>
          <tr className="bg-gray-200 text-center text-sm uppercase leading-normal text-gray-600">
            <th className="py-3 px-6 text-left">word</th>
            <th className="py-3 px-6 text-center">ipa</th>
            <th className="flex justify-center py-3 px-6">
              <AdjustmentsIcon className="h-6 w-6" />
            </th>
          </tr>
        </thead>
        <tbody className="text-sm font-light text-gray-600">
          {isLoading ? (
            <tr className="border-b border-gray-200">
              <td colSpan="4">
                <Loader />
              </td>
            </tr>
          ) : (
            dictionaries.map((dictionary) => (
              <tr
                className="border-b border-gray-200 hover:bg-gray-100"
                key={dictionary.id}
              >
                <td
                  className="my-4 flex cursor-pointer py-3 px-6"
                  onClick={() => view(dictionary.id)}
                >
                  <span className="font-medium">{dictionary.word}</span>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="text-bold flex items-center justify-center">
                    {dictionary.ipa}
                  </div>
                </td>
                <td className="py-3 px-6">
                  <div className="item-center flex justify-center">
                    <div
                      className="mr-2 w-4 transform cursor-pointer hover:scale-110 hover:text-yellow-500"
                      onClick={() => edit(dictionary.id)}
                    >
                      <SearchIcon className="h-5 w-5" />
                    </div>
                    <div
                      className="mr-2 w-4 transform cursor-pointer hover:scale-110 hover:text-yellow-500"
                      onClick={() => edit(dictionary.id)}
                    >
                      <PencilIcon className="h-5 w-5" />
                    </div>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Paginate
        perPage={5}
        pageCount={pageCount}
        handlePageClick={(offset) => setOffset(offset)}
      />
      {show && <Modal dictionary={dictionary} onClick={() => setShow(false)} />}
    </div>
  );
}
