import { useEffect, useState } from "react";
import {
  AdjustmentsIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import ReactPaginate from "react-paginate";
import Layout from "../../../components/cp/Layout";
import { AuthMiddleware } from "../../../middleware/auth";
import Loader from "../../../components/cp/Loader";
import Modal from "../../../components/cp/Modal";

function Dictionary() {
  const [itemsLength, setItemsLength] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [dictionary, setDictionary] = useState({});
  const [show, setShow] = useState(false);

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

  const showDictionary = async (id) => {
    const { dictionary } = await fetch(`/api/dictionaries/${id}`).then((res) =>
      res.json()
    );
    setDictionary(dictionary);
    setShow(true);
  };

  return (
    <Layout>
      <div className="flex mx-6 my-6">
        <h2 className="mr-4 text-lg font-large uppercase rounded border p-4">
          Dictionary
        </h2>
        <button className="inline-block px-4 py-2 text-xs font-sm text-center uppercase transition bg-transparent border-1 border-gray-200 rounded shadow ripple hover:shadow-lg hover:bg-gray-100 focus:outline-none">
          Create
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="flex items-center justify-center font-sans overflow-hidden shadow">
          <div className="w-full mx-6">
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
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
                        className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                        key={dictionary.id}
                        onClick={() => showDictionary(dictionary.id)}
                      >
                        <td className="py-3 px-6 text-left whitespace-nowrap">
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
                            <div className="w-4 mr-2 transform hover:text-yellow-500 hover:scale-110 cursor-pointer">
                              <PencilIcon className="h-5 w-5" />
                            </div>
                            <div className="w-4 mr-2 transform hover:text-red-500 hover:scale-110 cursor-pointer">
                              <TrashIcon className="h-5 w-5" />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                  {show && (
                    <Modal
                      dictionary={dictionary}
                      onClick={() => setShow(false)}
                    />
                  )}
                </tbody>
              </table>
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
