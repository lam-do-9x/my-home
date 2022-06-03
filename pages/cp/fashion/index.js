import { useEffect, useState } from "react";
import Image from "next/image";
import Select from "react-select";
import Layout from "../../../components/cp/Layout";
import ImageModal from "../../../components/cp/ImageModal";
import { AuthMiddleware } from "../../../middleware/auth";
import Loader from "../../../components/cp/Loader";

const options = [
  { value: "jean", label: "Jean" },
  { value: "kaki", label: "Kaki" },
  { value: "shirt", label: "Shirt" },
  { value: "polo", label: "Polo" },
  { value: "cardigan", label: "Cardigan" },
  { value: "t-shirt", label: "T-shirt" },
  { value: "trouser", label: "Trouser" },
  { value: "sweater", label: "Sweater" },
  { value: "short", label: "Short" },
  { value: "hoodie", label: "Hoodie" },
  { value: "henley", label: "Henley" },
  { value: "jacket", label: "Jacket" },
  { value: "blazer", label: "Blazer" },
  { value: "leather", label: "Leather" },
  { value: "coat", label: "Coat" },
  { value: "overcoat", label: "Overcoat" },
  { value: "sweatsuit", label: "Sweatsuit" },
  { value: "outerwear", label: "Outerwear" },
  { value: "suit", label: "Suit" },
];

function Fashion() {
  const [modal, setModal] = useState(false);
  const [block, setBlock] = useState(null);
  const [fashions, setFashions] = useState([]);
  const [hasLoadMore, setHasLoadMore] = useState(false);
  const [lastId, setLastId] = useState(undefined);
  const [isLoading, setLoading] = useState(true);

  function openImage(block) {
    setBlock(block);
    setModal(true);
  }

  async function getFashions() {
    return await fetch(`/api/fashions?take=8&id=${lastId}`).then((res) =>
      res.json()
    );
  }

  useEffect(async () => {
    const { fashions, hasLoadMore } = await getFashions();
    setFashions(fashions);
    if (hasLoadMore) {
      setLastId(fashions[7].id - 1);
    }
    setHasLoadMore(hasLoadMore);
    setLoading(false);
  }, []);

  async function handleClick() {
    const fhs = await getFashions();
    if (fhs.hasLoadMore) {
      setLastId(fhs.fashions[7].id - 1);
    }
    setFashions([...fashions, ...fhs.fashions]);
    setHasLoadMore(fhs.hasLoadMore);
  }

  return (
    <Layout>
      <div className="mx-6 mt-6 h-full w-full">
        <h2 className="font-large mr-4 flex max-w-min rounded border p-2 text-lg uppercase">
          Fashion
        </h2>
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div className="w-full overflow-hidden">
            <div
              className="flex items-center justify-start border-b-2 py-2"
              style={{
                marginRight: "4.5rem",
              }}
            >
              <p className="mr-2">Clothes:</p>
              <Select options={options} isMulti={true} />
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
                        key={clothe.id}
                        className={`bg-${clothe.color}-200 mx-2 rounded p-2`}
                      >
                        {clothe.name}
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
      </div>
    </Layout>
  );
}

export default AuthMiddleware(Fashion);
