import { useState, useEffect, useRef } from "react";
import {
  AdjustmentsIcon,
  PencilAltIcon,
  PencilIcon,
} from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import Layout from "../../../components/cp/Layout";
import UpSetImpov from "../../../components/cp/UpSetImpov";
import MDRender from "../../../components/cp/MDR";
import RandomWord from "../../../components/cp/RandomWord";
import { debounce } from "../../../lib/helper";
import Loader from "../../../components/cp/Loader";
import Modal from "../../../components/cp/ImprovModal";
import Paginate from "../../../components/cp/Paginate";

export default function Improv() {
  const [isLoading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [isUpSet, setUpSet] = useState(false);
  const [cursors, setCursor] = useState([]);
  const [isShow, setShow] = useState(false);
  const [improvisations, setImprovisations] = useState([]);
  const [improvisation, setImprovisation] = useState({});
  const [keyword, setKeyword] = useState("");

  useEffect(async () => {
    await fetchImprovisations();
    setLoading(false);
  }, [offset]);

  function close(improv) {
    if (Object.keys(improvisations).length !== 0) {
      const isExist = improvisations.findIndex((i) => i.id === improv.id);
      if (isExist !== -1) {
        improvisations[isExist] = improv;
        setImprovisations(improvisations);
      } else {
        setImprovisations([improv, ...improvisations]);
      }
    }

    setUpSet(false);
  }

  async function fetchImprovisations(word) {
    setLoading(true);

    let url = `/api/improv?page_size=5&start_cursor=${cursors[offset - 1]}`;

    if (word || keyword !== "") {
      url = `${url}&q=${word || keyword}`;
    }

    const { improvisations, cursor } = await fetch(url).then((res) =>
      res.json()
    );
    setCursor(cursor);
    setPageCount(cursor.length + 1 > 1 ? cursor.length + 1 : 0);

    setImprovisations(improvisations);
  }

  async function fetchImprovByQuery(word) {
    await fetchImprovisations(word);
    setLoading(false);
  }

  const debounceDropDown = useRef(
    debounce((nextValue) => fetchImprovByQuery(nextValue), 1000)
  ).current;

  function search(e) {
    setLoading(true);
    setPageCount(0);
    setOffset(0);
    const { value } = e.target;
    setKeyword(value);
    debounceDropDown(value);
  }

  function create() {
    setImprovisation({});
    setUpSet(true);
  }

  function edit(id) {
    const improv = improvisations.find((i) => i.id === id);
    setImprovisation(improv);
    setUpSet(true);
  }

  async function show(id) {
    const { improv } = await fetch(`/api/improv/${id}`).then((res) =>
      res.json()
    );
    setImprovisation(improv);
    setShow(true);
  }

  return (
    <Layout>
      <div className="flex mx-6 my-6">
        <h2 className="mr-4 text-lg font-large uppercase rounded border p-4">
          Improv
        </h2>
      </div>
      <div className="w-full">
        <div className="flex mx-6 my-2">
          <RandomWord />
          <div className="w-2/3">
            <div className="flex justify-between my-2">
              <div
                className="p-2 rounded-md shadow border cursor-pointer hover:bg-gray-100"
                onClick={create}
              >
                <PencilAltIcon className="h-5 w-5" />
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
                  value={keyword}
                  onChange={search}
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
              <tbody className="text-gray-600 text-sm font-light">
                {isLoading ? (
                  <tr>
                    <td colSpan="2">
                      <Loader />
                    </td>
                  </tr>
                ) : (
                  improvisations.map((improv) => (
                    <tr
                      className="border-b border-gray-200 hover:bg-gray-100"
                      key={improv.id}
                    >
                      <td
                        className="flex my-4 py-3 px-6 cursor-pointer font-medium"
                        onClick={() => show(improv.id)}
                      >
                        <MDRender
                          content={
                            improv.properties.display.rich_text[0]?.text.content
                          }
                          className={"h-5 overflow-hidden"}
                        />
                      </td>
                      <td className="py-3 px-6">
                        <div
                          className="flex justify-center transform hover:text-yellow-500 hover:scale-110 cursor-pointer"
                          onClick={() => edit(improv.id)}
                        >
                          <PencilIcon className="h-5 w-5" />
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
              handlePageClick={(offset) => setOffset(offset / 5)}
            />
          </div>
          {isShow && (
            <Modal improv={improvisation} onClick={() => setShow(false)} />
          )}
          {isUpSet && (
            <UpSetImpov
              improv={improvisation}
              onClick={(improv) => close(improv)}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}
