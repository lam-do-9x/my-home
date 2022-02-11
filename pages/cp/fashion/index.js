import { useEffect, useState } from "react";
import Image from "next/image";
import Layout from "../../../components/cp/Layout";
import ReceiptModal from "../../../components/cp/ReceiptModal";
import { AuthMiddleware } from "../../../middleware/auth";
import Loader from "../../../components/cp/Loader";

function Fashion() {
  const [modal, setModal] = useState(false);
  const [block, setBlock] = useState(null);
  const [receipts, setReceipts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  function openPage(block) {
    setBlock(block);
    setModal(true);
  }

  useEffect(async () => {
    const { receipts } = await fetch("/api/receipts").then((res) => res.json());
    setReceipts(receipts);
    setLoading(false);
  }, []);

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
            <div className="my-6 mr-6 grid grid-cols-4 gap-x-4 gap-y-12">
              {receipts
                .filter((id) => id !== 0)
                .map((block) => (
                  <div
                    className="flex flex w-fit cursor-pointer flex-col flex-col items-center justify-start rounded border border-gray-200 shadow-md"
                    key={block.id}
                    onClick={() => openPage(block)}
                  >
                    <Image
                      className="object-fit"
                      src={
                        block.cover ??
                        "/ngo-thanh-tung-pCTuLkx8erE-unsplash.jpg"
                      }
                      width={250}
                      height={250}
                    />
                    <div className="pt-2 font-medium uppercase">
                      {block.properties.name.title[0].plain_text}
                    </div>
                    <div
                      className={`mb-2 rounded p-2 bg-${block.properties.type.select.color}-200`}
                    >
                      {block.properties.type.select.name}
                    </div>
                  </div>
                ))}
              {modal && (
                <ReceiptModal block={block} onClick={() => setModal(false)} />
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default AuthMiddleware(Fashion);
