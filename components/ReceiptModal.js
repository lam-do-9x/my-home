import { useState, useEffect } from "react";
import NotionRender from "./NotionRender";
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
    <div className="absolute inset-0 bg-black bg-opacity-30 h-screen w-full">
      <div className="flex fixed left-0 top-0 w-full h-full z-50 transition-opacity duration-300 opacity-100">
        <div className="bg-white rounded-lg border shadow m-20 w-full overflow-y-hidden overflow-y-scroll">
          <div className="flex justify-center	items-center py-6 font-bold text-3xl uppercase border-b mx-20">
            {props.block.properties.name.title[0].plain_text}
            <svg
              className="ml-auto fill-current text-gray-700 w-5 h-5 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 18 18"
              onClick={() => close({})}
            >
              <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
            </svg>
          </div>
          <div className="px-20 py-6">
            {isLoading ? <Loader /> : <NotionRender blocks={blocks} />}
          </div>
        </div>
      </div>
    </div>
  );
}
