import { XIcon } from "@heroicons/react/outline";
import Image from "next/image";

export default function ReceiptModal(props) {
  function close() {
    props.onClick();
  }

  return (
    <div className="absolute inset-0 h-screen w-full bg-black bg-opacity-30">
      <div className="fixed left-0 top-0 z-50 flex h-full w-full opacity-100 transition-opacity duration-300">
        <div className="m-20 w-full overflow-y-hidden overflow-y-scroll rounded-lg border bg-white shadow">
          <div className="mx-20 flex items-center justify-between border-b py-6 text-3xl font-bold uppercase">
            <a href={props.receipt.reference} target="_blank" rel="noreferrer">
              {props.receipt.name}
            </a>
            <XIcon
              className="h-5 w-5 cursor-pointer"
              onClick={() => close({})}
            />
          </div>
          <div className="flex px-20">
            <div className="my-2 mr-2 w-1/2">
              <div>
                <p className="text-xl font-bold">Ingredients</p>
                <ul className="flex flex-wrap">
                  {props.receipt.ingredients.map((ingredient) => (
                    <li
                      key={ingredient.selected.id}
                      className="my-2 mr-2 border p-2"
                    >
                      {ingredient.selected.label}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xl font-bold">Sessions</p>
                <ul className="flex flex-wrap">
                  {props.receipt.sessions.map((session) => (
                    <li
                      key={session.selected.id}
                      className="my-2 mr-2 border p-2"
                    >
                      {session.selected.label}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xl font-bold">Methods</p>
                <ul className="flex flex-wrap">
                  {props.receipt.methods.map((method) => (
                    <li
                      key={method.selected.id}
                      className="my-2 mr-2 border p-2"
                    >
                      {method.selected.label}
                    </li>
                  ))}
                </ul>
              </div>
              {props.receipt.note.length > 0 && (
                <div>
                  <p className="text-xl font-bold">Note</p>
                  <p className="mr-4 break-words">{props.receipt.note}</p>
                </div>
              )}
            </div>
            <div
              style={{ width: "100%", position: "relative" }}
              className="my-auto w-1/2"
            >
              <Image
                className="object-fit"
                src={
                  props.receipt.cover ??
                  "/ngo-thanh-tung-pCTuLkx8erE-unsplash.jpg"
                }
                width={700}
                height={475}
                layout="responsive"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
