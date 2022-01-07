import { useState, useEffect } from "react";
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

export default function Improv() {
  const [isUpSet, setUpSet] = useState(false);
  const [improvs, setImprov] = useState([]);
  const [improv, setSImprov] = useState({});

  useEffect(async () => {
    const { improvs } = await fetch("/api/improv").then((res) => res.json());
    setImprov(improvs);
  }, []);

  function close(improv) {
    if (Object.keys(improv).length !== 0) {
      const isExist = improvs.findIndex((i) => i.id === improv.id);
      if (isExist !== -1) {
        improvs[isExist] = improv;
        setImprov(improvs);
      } else {
        setImprov([improv, ...improvs]);
      }
    }

    setUpSet(false);
  }

  function create() {
    setSImprov({});
    setUpSet(true);
  }

  function edit(id) {
    const improv = improvs.find((i) => i.id === id);
    setSImprov(improv);
    setUpSet(true);
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
                {improvs.map((improv) => (
                  <tr
                    className="border-b border-gray-200 hover:bg-gray-100"
                    key={improv.id}
                  >
                    <td className="flex my-4 py-3 px-6 cursor-pointer font-medium">
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
                ))}
              </tbody>
            </table>
          </div>

          {isUpSet && (
            <UpSetImpov improv={improv} onClick={(improv) => close(improv)} />
          )}
        </div>
      </div>
    </Layout>
  );
}
