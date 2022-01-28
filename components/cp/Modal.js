import { XIcon } from "@heroicons/react/outline";
import MDRender from "./MDR";
import styles from "./CP.module.css";

export default function Modal(props) {
  function close() {
    props.onClick();
  }

  return (
    <div
      className={`fixed left-0 top-0 right-0 bottom-0 ${styles["modal"]} flex h-full w-screen items-center justify-center`}
    >
      <div
        className={`relative flex w-full max-w-fit ${styles["max-h-modal"]} flex-col overflow-hidden rounded-lg bg-white shadow-2xl`}
      >
        <div className="mt-2 flex w-full items-center px-7">
          <div className="w-full text-center font-bold text-yellow-500">
            {props.dictionary.word}
          </div>
          <XIcon
            className="h-5 w-5 cursor-pointer fill-current text-gray-700"
            onClick={close}
          />
        </div>
        <div className="prose my-2 overflow-x-hidden px-7">
          <MDRender content={props.dictionary.content} />
        </div>
      </div>
    </div>
  );
}
