import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Layout from "../../../components/cp/Layout";
import { AuthMiddleware } from "../../../middleware/auth";
import Loader from "../../../components/cp/Loader";
import Modal from "../../../components/cp/Modal";

function Pronunciation() {
  const [itemsLength, setItemsLength] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [dictionary, setDictionary] = useState({});
  const [isShow, setShow] = useState(false);

  useEffect(async () => {
    const { pronunciations } = await fetch("/api/pronunciations").then((res) =>
      res.json()
    );
    setItemsLength(pronunciations.length);
    setCurrentItems(pronunciations.slice(itemOffset, itemOffset + 10));
    setPageCount(Math.ceil(pronunciations.length / 10));

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

  const show = async (id) => {
    await fetchDictionary(id);
    setShow(true);
  };

  return (
    <Layout>
      <div className="flex items-center mx-6 my-6">
        <h2 className="flex mr-4 text-lg font-large uppercase rounded border p-4 max-w-min">
          Pronunciation
        </h2>
      </div>
      <div className="overflow-x-auto">
        <div className="flex items-center justify-center font-sans overflow-hidden shadow">
          <div className="w-full mx-6">
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-min w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal text-center">
                    <th className="py-3 px-6 text-center">ipa</th>
                    <th className="py-3 px-6 text-center">pronunciation</th>
                    <th className="py-3 px-6 text-center">type</th>
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
                    currentItems.map((pronunciation) => (
                      <tr
                        className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer text-center font-medium"
                        key={pronunciation.id}
                        onClick={() =>
                          show(pronunciation.properties.ipa.title[0].plain_text)
                        }
                      >
                        <td className="py-3 px-6">
                          {pronunciation.properties.ipa.title[0].plain_text}
                        </td>
                        <td className="py-3 px-6">
                          {
                            pronunciation.properties.pronounce.rich_text[0]
                              .plain_text
                          }
                        </td>
                        <td className="py-3 px-6 flex justify-center">
                          <div
                            className={`max-w-min px-4 py-2 border rounded bg-${pronunciation.properties.type.select.color}-200`}
                          >
                            {pronunciation.properties.type.select.name}
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

export default AuthMiddleware(Pronunciation);
