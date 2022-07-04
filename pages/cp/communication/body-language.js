import { useEffect, useState } from "react";
import { PencilAltIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Layout from "../../../components/cp/Layout";
import { getColor } from "../../../components/cp/Emotion";
import InsertBodyLanguage from "../../../components/cp/InsertBodyLanguage";
import Loader from "../../../components/cp/Loader";
import Paginate from "../../../components/cp/Paginate";

export default function BodyLanguage() {
  const [isUpSet, setUpSet] = useState(false);
  const [bodyLanguages, setBodyLanguages] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [offset, setOffset] = useState(0);

  async function getBodyLanguages() {
    return await fetch(`/api/body-language?take=8&skip=${offset}`).then((res) =>
      res.json()
    );
  }

  useEffect(async () => {
    const { bodyLanguages, pageCount } = await getBodyLanguages();
    setPageCount(pageCount > 1 ? pageCount : 0);
    setBodyLanguages(bodyLanguages);
    setLoading(false);
  }, [offset]);

  async function handleInsert(bodyLanguage) {
    if (Object.keys(bodyLanguage).length > 0) {
      const { bodyLanguages, pageCount } = await getBodyLanguages();
      setPageCount(pageCount > 1 ? pageCount : 0);
      setBodyLanguages(bodyLanguages);
    }
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
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div className="w-full pb-4">
            <div className="my-6 mr-6 grid grid-cols-4 gap-y-10">
              {bodyLanguages?.map((bodyLanguage) => (
                <div
                  className="flex flex w-fit cursor-pointer flex-col items-center justify-start rounded border border-gray-200 shadow-md"
                  key={bodyLanguage.id}
                >
                  {bodyLanguage.media.includes("image") && (
                    <Image
                      className="object-cover"
                      src={
                        bodyLanguage.media ??
                        "/ngo-thanh-tung-pCTuLkx8erE-unsplash.jpg"
                      }
                      width={250}
                      height={250}
                    />
                  )}
                  {bodyLanguage.media.includes("video") && (
                    <video
                      style={{ width: "250px", height: "250px" }}
                      controls={true}
                    >
                      <source src={bodyLanguage.media} />
                    </video>
                  )}
                  <div className="flex w-64 flex-wrap justify-center p-2">
                    <div
                      key={bodyLanguage.emotions[0].selected.id}
                      className={`mx-2 mb-2 rounded border p-2 ${getColor(
                        bodyLanguage.emotions[0].selected.value
                      )}`}
                    >
                      {bodyLanguage.emotions[0].selected.label}
                    </div>
                  </div>
                  <div className="flex w-64 flex-wrap justify-center p-2">
                    {bodyLanguage.types?.map((type) => (
                      <div
                        key={type.selected.id}
                        className={`mx-2 rounded border p-2`}
                      >
                        {type.selected.label}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <Paginate
              perPage={8}
              pageCount={pageCount}
              handlePageClick={(offset) => setOffset(offset)}
            />
            {isUpSet && (
              <InsertBodyLanguage
                onClick={(bodyLanguage) => handleInsert(bodyLanguage)}
              />
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
