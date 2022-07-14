import { useEffect, useState } from "react";
import Image from "next/image";
import Layout from "../../../components/cp/Layout";
import ReceiptModal from "../../../components/cp/ReceiptModal";
import { AuthMiddleware } from "../../../middleware/auth";
import Loader from "../../../components/cp/Loader";
import Paginate from "../../../components/cp/Paginate";

function Receipts() {
  const [modal, setModal] = useState(false);
  const [block, setBlock] = useState(null);
  const [receipts, setReceipts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [offset, setOffset] = useState(0);

  function openPage(block) {
    setBlock(block);
    setModal(true);
  }

  async function getReceipts() {
    let url = `/api/receipts?take=8&skip=${offset}`;

    return await fetch(url).then((res) => res.json());
  }

  useEffect(async () => {
    const { receipts, pageCount } = await getReceipts();
    setReceipts(receipts);
    setPageCount(pageCount > 1 ? pageCount : 0);
    setLoading(false);
  }, []);

  return (
    <Layout>
      <div className="mx-6 mt-6 h-full w-full">
        <h2 className="font-large mr-4 flex max-w-min rounded border p-2 text-lg uppercase">
          Receipts
        </h2>
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div className="overflow-hidden">
            <div className="flex w-full flex-wrap">
              {receipts.map((receipt) => (
                <div
                  className="m-5 flex w-1/5 cursor-pointer flex-col items-center justify-center rounded border border-gray-200 shadow-md"
                  key={receipt.id}
                  onClick={() => openPage(receipt)}
                >
                  <Image
                    className="object-fit"
                    src={
                      receipt.cover ??
                      "/ngo-thanh-tung-pCTuLkx8erE-unsplash.jpg"
                    }
                    width={300}
                    height={300}
                  />
                  <div className="flex w-64 flex-wrap justify-center p-2">
                    {receipt.sessions?.map((session) => (
                      <div
                        key={session.selected.id}
                        className={`mx-2 mb-2 rounded border p-2`}
                      >
                        {session.selected.label}
                      </div>
                    ))}
                  </div>
                  <div className="flex w-64 flex-wrap justify-center p-2">
                    {receipt.methods?.map((method) => (
                      <div
                        key={method.selected.id}
                        className={`mx-2 mb-2 rounded border p-2`}
                      >
                        {method.selected.label}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {modal && (
                <ReceiptModal block={block} onClick={() => setModal(false)} />
              )}
              <Paginate
                perPage={8}
                pageCount={pageCount}
                handlePageClick={(offset) => setOffset(offset)}
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default AuthMiddleware(Receipts);
