import { useEffect, useState, useRef } from "react";
import {
  AdjustmentsIcon,
  PencilIcon,
  AnnotationIcon,
} from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import ReactPaginate from "react-paginate";
import Layout from "../../../components/cp/Layout";
import { AuthMiddleware } from "../../../middleware/auth";
import Loader from "../../../components/cp/Loader";
import Modal from "../../../components/cp/Modal";
import UpSetModal from "../../../components/cp/UpSetModal";

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
}

function Dictionary() {
  const [itemsLength, setItemsLength] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [dictionary, setDictionary] = useState({});
  const [isShow, setShow] = useState(false);
  const [isUpSet, setUpSet] = useState(false);
  const [keyword, setKeyword] = useState("");

  useEffect(async () => {
    const { dictionaries } = await fetch("/api/dictionaries").then((res) =>
      res.json()
    );
    setItemsLength(dictionaries.length);
    setCurrentItems(dictionaries.slice(itemOffset, itemOffset + 10));
    setPageCount(Math.ceil(dictionaries.length / 10));

    setLoading(false);
  }, [itemOffset, 10]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 10) % itemsLength;
    setItemOffset(newOffset);
  };

  async function fetchDictionary(id) {
    const { dictionary } = await fetch(`/api/dictionaries/${id}`).then((res) =>
      res.json()
    );
    setDictionary(dictionary);
  }

  async function fetchDicByQuery(word) {
    const { dictionaries } = await fetch(`/api/dictionaries?q=${word}`).then(
      (res) => res.json()
    );
    setItemsLength(dictionaries.length);
    setCurrentItems(dictionaries.slice(itemOffset, itemOffset + 10));
    setPageCount(Math.ceil(dictionaries.length / 10));
  }

  const debounceDropDown = useRef(
    debounce((nextValue) => fetchDicByQuery(nextValue), 1000)
  ).current;

  function search(e) {
    const { value } = e.target;
    setKeyword(value);
    debounceDropDown(value);
  }

  const show = async (id) => {
    await fetchDictionary(id);
    setShow(true);
  };

  const edit = async (id) => {
    await fetchDictionary(id);
    setUpSet(true);
  };

  return (
    <Layout>
      <div className="flex items-center mx-6 my-6">
        <h2 className="flex mr-4 text-lg font-large uppercase rounded border p-4 max-w-min">
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
            <div className="bg-white my-6">
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
                    <tr>
                      <td colSpan="4">
                        <Loader />
                      </td>
                    </tr>
                  ) : (
                    currentItems.map((dictionary) => (
                      <tr
                        className="border-b border-gray-200 hover:bg-gray-100"
                        key={dictionary.id}
                      >
                        <td
                          className="py-3 px-6 text-left whitespace-nowrap cursor-pointer"
                          onClick={() => show(dictionary.id)}
                        >
                          <span className="font-medium">{dictionary.word}</span>
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
                  onClick={() => setUpSet(false)}
                />
              )}
              <ReactPaginate
                breakLabel="..."
                nextLabel="next"
                previousLabel="previous"
                onPageChange={handlePageClick}
                pageRangeDisplayed={10}
                pageCount={pageCount}
                renderOnZeroPageCount={null}
                className="flex justify-center p-4"
                pageClassName="border"
                pageLinkClassName="px-3 py-6"
                breakClassName="border"
                breakLinkClassName="px-3 py-6"
                activeClassName="bg-gray-200"
                previousClassName="mr-3 border"
                previousLinkClassName="px-3 py-6"
                nextClassName="ml-3 border"
                nextLinkClassName="px-3 py-6"
                disabledLinkClassName="text-gray-100"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AuthMiddleware(Dictionary);
