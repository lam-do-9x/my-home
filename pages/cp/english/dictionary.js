import { useEffect, useState, useRef } from "react";
import {
  AdjustmentsIcon,
  PencilIcon,
  AnnotationIcon,
} from "@heroicons/react/outline";
import { SearchIcon, CheckIcon } from "@heroicons/react/solid";
import Layout from "../../../components/cp/Layout";
import { AuthMiddleware } from "../../../middleware/auth";
import Loader from "../../../components/cp/Loader";
import Modal from "../../../components/cp/Modal";
import UpSetModal from "../../../components/cp/UpSetModal";
import { debounce } from "../../../lib/helper";
import fetchClient from "../../../lib/fetchClient";
import Paginate from "../../../components/cp/Paginate";

function Dictionary() {
  const [isLoading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [dictionaries, setDictionaries] = useState([]);
  const [dictionary, setDictionary] = useState({});
  const [isShow, setShow] = useState(false);
  const [isUpSet, setUpSet] = useState(false);
  const [keyword, setKeyword] = useState("");

  useEffect(async () => {
    await fetchDictionaries();
    setLoading(false);
  }, [offset]);

  async function fetchDictionaries(word) {
    let url = `/api/dictionaries?take=10&skip=${offset}`;

    if (word || keyword !== "") {
      url = `${url}&q=${word || keyword}`;
    }

    const { dictionaries, pageCount } = await fetchClient(url);

    setPageCount(pageCount > 1 ? pageCount : 0);

    setDictionaries(dictionaries);
  }

  async function fetchDicByQuery(word) {
    await fetchDictionaries(word);
    setLoading(false);
  }

  const debounceDropDown = useRef(
    debounce((word) => fetchDicByQuery(word), 1000)
  ).current;

  function search(e) {
    setLoading(true);
    setPageCount(0);
    setOffset(0);
    const { value } = e.target;
    setKeyword(value);
    debounceDropDown(value);
  }

  const show = async (id) => {
    const dictionary = dictionaries.find((d) => d.id === id);

    setDictionary(dictionary);

    setShow(true);
  };

  const edit = async (id) => {
    const dictionary = dictionaries.find((d) => d.id === id);

    setDictionary(dictionary);

    setUpSet(true);
  };

  async function close(dictionary) {
    if (Object.keys(dictionary).length !== 0) {
      const index = dictionaries.findIndex((d) => d.id === dictionary.id);

      dictionaries[index] = dictionary;

      setDictionaries(dictionaries);
    }

    setUpSet(false);
  }

  return (
    <Layout>
      <div className="flex items-center mx-6 mt-6">
        <h2 className="flex mr-4 text-lg font-large uppercase rounded border p-2 max-w-min">
          Dictionary
        </h2>
        <a
          className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-500 text-center font-bold rounded p-2"
          href="https://notevibes.com/cabinet.php"
          target="_blank"
          rel="noreferrer"
        >
          <AnnotationIcon className="h-5 w-5 mx-2" />
          Text to speech
        </a>
      </div>
      <div className="overflow-x-auto">
        <div className="flex items-center justify-center font-sans overflow-hidden shadow">
          <div className="w-full mx-6">
            <div className="flex justify-end mb-2">
              <label className="relative block">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <SearchIcon className="h-5 w-5 fill-gray-300" />
                </span>
                <input
                  className="placeholder:italic placeholder:text-gray-400 block bg-white w-full border border-gray-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none sm:text-sm"
                  placeholder="Search for word..."
                  type="text"
                  name="search"
                  onChange={search}
                  value={keyword}
                />
              </label>
            </div>
            <table className="min-w-max w-full table-auto shadow-md rounded">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal text-center">
                  <th className="py-3 px-6 text-left">word</th>
                  <th className="py-3 px-6 text-center">ipa</th>
                  <th className="py-3 px-6 text-center">pronunciation</th>
                  <th className="py-3 px-6 flex justify-center">
                    <AdjustmentsIcon className="h-6 w-6" />
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
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
                        className="flex my-4 py-3 px-6 cursor-pointer"
                        onClick={() => show(dictionary.id)}
                      >
                        <span className="font-medium">{dictionary.word}</span>
                        {dictionary.content.length !== 0 && (
                          <CheckIcon className="h-5 w-5" />
                        )}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center text-bold">
                          {dictionary.ipa}
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                          <audio id={dictionary.id} controls>
                            <source
                              src={`https://www.oxfordlearnersdictionaries.com${dictionary.pronunciation}`}
                              type="audio/mpeg"
                            ></source>
                          </audio>
                        </div>
                      </td>
                      <td className="py-3 px-6">
                        <div className="flex item-center justify-center">
                          <div
                            className="w-4 mr-2 transform hover:text-yellow-500 hover:scale-110 cursor-pointer"
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
            {isShow && (
              <Modal dictionary={dictionary} onClick={() => setShow(false)} />
            )}
            {isUpSet && (
              <UpSetModal
                dictionary={dictionary}
                onClick={(dictionary) => close(dictionary)}
              />
            )}
            <Paginate
              perPage={10}
              pageCount={pageCount}
              handlePageClick={(offset) => setOffset(offset)}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AuthMiddleware(Dictionary);
