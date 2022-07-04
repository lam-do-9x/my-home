import { useEffect, useState } from "react";
import { PencilAltIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Layout from "../../../components/cp/Layout";
import { getColor } from "../../../components/cp/Emotion";
import InsertBodyLanguage from "../../../components/cp/InsertBodyLanguage";

export default function BodyLanguage() {
  const [isUpSet, setUpSet] = useState(false);

  async function handleInsert(bodyLanguage) {
    // if (Object.keys(bodyLanguage).length > 0) {
    //   const { fashions, total } = await getFashions();
    //   setFashions(fashions);
    //   checkLoadMore(total, fashions.length);
    // }
    setUpSet(false);
  }

  return (
    <Layout>
      <div className="mx-6 my-6 h-full w-full">
        <div className="flex items-center">
          <h2 className="font-large mr-4 flex rounded border p-2 text-lg uppercase">
            Body Language
          </h2>
          <div
            className="cursor-pointer rounded-md border p-3 shadow hover:bg-gray-100"
            onClick={() => setUpSet(true)}
          >
            <PencilAltIcon className="h-5 w-5" />
          </div>
        </div>
        <div className="w-full pb-2">
          <div className="my-6 mr-6 grid grid-cols-4 gap-y-10">
            <div
              className="flex flex w-fit cursor-pointer flex-col items-center justify-start rounded border border-gray-200 shadow-md"
              key={1}
            >
              <Image
                className="object-cover"
                src={"/ngo-thanh-tung-pCTuLkx8erE-unsplash.jpg"}
                width={250}
                height={250}
              />
              <div className="flex w-64 flex-wrap justify-center p-2">
                {[
                  {
                    selected: { id: 1, value: "surprise", label: "Surprise" },
                  },
                ]?.map((emotion) => (
                  <div
                    key={emotion.selected.id}
                    className={`mx-2 mb-2 rounded border p-2 ${getColor(
                      emotion.selected.value
                    )}`}
                  >
                    {emotion.selected.label}
                  </div>
                ))}
              </div>
              <div className="flex w-64 flex-wrap justify-center p-2">
                {[
                  {
                    selected: { id: 1, value: "practice", label: "Practice" },
                  },
                ]?.map((type) => (
                  <div
                    key={type.selected.id}
                    className={`mx-2 rounded border p-2`}
                  >
                    {type.selected.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {isUpSet && (
          <InsertBodyLanguage
            onClick={(bodyLanguage) => handleInsert(bodyLanguage)}
          />
        )}
      </div>
    </Layout>
  );
}
