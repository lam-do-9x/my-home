import { useEffect, useState } from "react";
import Image from "next/image";
import Select from "react-select";
import { PencilAltIcon } from "@heroicons/react/outline";
import Layout from "../../../components/cp/Layout";
import ImageModal from "../../../components/cp/ImageModal";
import { AuthMiddleware } from "../../../middleware/auth";
import Loader from "../../../components/cp/Loader";
import InsertFashion from "../../../components/cp/InsertFashion";

function Fashion() {
  const [modal, setModal] = useState(false);
  const [block, setBlock] = useState(null);
  const [fashions, setFashions] = useState([]);
  const [hasLoadMore, setHasLoadMore] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isUpSet, setUpSet] = useState(false);
  const [options, setOptions] = useState([]);

  function openImage(block) {
    setBlock(block);
    setModal(true);
  }

  async function getFashions(lastId = undefined) {
    return await fetch(`/api/fashions?take=8&id=${lastId}`).then((res) =>
      res.json()
    );
  }
  async function getSelectedOption() {
    const options = await fetch("/api/fashions/selected").then((res) =>
      res.json()
    );
    setOptions(options);
  }

  useEffect(async () => {
    const { fashions, hasLoadMore } = await getFashions();
    setFashions(fashions);
    setHasLoadMore(hasLoadMore);
    setLoading(false);
  }, []);

  async function handleClick() {
    const lastId = fashions[7].id - 1;
    const fhs = await getFashions(lastId);
    setFashions([...fashions, ...fhs.fashions]);
    setHasLoadMore(fhs.hasLoadMore);
  }

  async function handleInsert(fhs) {
    if (Object.keys(fhs).length > 0) {
      const { fashions, hasLoadMore } = await getFashions();
      setFashions(fashions);
      setHasLoadMore(hasLoadMore);
    }
    setUpSet(false);
  }

  async function getFilterClothesFashions(selected) {
    return await fetch(`/api/fashions?take=8&clothes=${selected}`).then((res) =>
      res.json()
    );
  }

  async function handleFilterClothes(selected) {
    const clothesSelected = selected
      ?.map((select) => {
        return select.id;
      })
      .join(",");
    const { fashions } = await getFilterClothesFashions(clothesSelected);
    setFashions(fashions);
    setHasLoadMore(false);
  }

  async function handleFocusSelected() {
    await getSelectedOption();
  }

  return (
    <Layout>
      <div className="mx-6 my-6 h-full w-full">
        <div className="flex">
          <h2 className="font-large mr-4 flex max-w-min rounded border p-2 text-lg uppercase">
            Fashion
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
          <div className="w-full pb-2">
            <div
              className="flex items-center justify-start border-b-2 py-2"
              style={{
                marginRight: "4.5rem",
              }}
            >
              <p className="mr-2">Clothes:</p>
              <Select
                options={options.clothesSelectedOptions}
                isMulti={true}
                onChange={handleFilterClothes}
                onFocus={handleFocusSelected}
              />
            </div>
            <div className="my-6 mr-6 grid grid-cols-4 gap-y-10">
              {fashions.map((block) => (
                <div
                  className="flex flex w-fit cursor-pointer flex-col flex-col items-center justify-start rounded border border-gray-200 shadow-md"
                  key={block.id}
                  onClick={() => openImage(block)}
                >
                  <Image
                    className="object-cover"
                    src={
                      block.image ?? "/ngo-thanh-tung-pCTuLkx8erE-unsplash.jpg"
                    }
                    width={250}
                    height={250}
                  />
                  <div className="flex p-2">
                    {block.clothes?.map((clothe) => (
                      <div
                        key={clothe.selected.id}
                        className={`mx-2 rounded border p-2`}
                      >
                        {clothe.selected.label}
                      </div>
                    ))}
                  </div>
                  <div className="flex p-2">
                    {block.types?.map((type) => (
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
              {modal && (
                <ImageModal block={block} onClick={() => setModal(false)} />
              )}
            </div>
            {hasLoadMore && (
              <div className="mb-4 flex justify-center">
                <button
                  className=" rounded border p-2 uppercase"
                  onClick={handleClick}
                >
                  load more
                </button>
              </div>
            )}
          </div>
        )}
        {isUpSet && (
          <InsertFashion onClick={(fashion) => handleInsert(fashion)} />
        )}
      </div>
    </Layout>
  );
}

export default AuthMiddleware(Fashion);
