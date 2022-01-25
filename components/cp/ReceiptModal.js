import { useState, useEffect } from "react";
import { XIcon } from "@heroicons/react/outline";
import NotionRender from "../notion/NotionRender";
import Loader from "./Loader";

export default function ReceiptModal(props) {
  function close() {
    props.onClick();
  }

  const [blocks, setBlocks] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(async () => {
    const { blocks } = await fetch(`/api/receipts/${props.block.id}`).then(
      (res) => res.json()
    );
    setBlocks(blocks);
    setLoading(false);
  }, []);

  return (
    <div className="absolute inset-0 h-screen w-full bg-black bg-opacity-30">
      <div className="fixed left-0 top-0 z-50 flex h-full w-full opacity-100 transition-opacity duration-300">
        <div className="m-20 w-full overflow-y-hidden overflow-y-scroll rounded-lg border bg-white shadow">
          <div className="mx-20 flex items-center justify-between border-b py-6 text-3xl font-bold uppercase">
            {props.block.properties.name.title[0].plain_text}
            <XIcon
              className="h-5 w-5 cursor-pointer"
              onClick={() => close({})}
            />
          </div>
          <div className="px-20 py-6">
            {isLoading ? (
              <div className="my-52">
                <Loader />
              </div>
            ) : (
              <NotionRender blocks={blocks} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
