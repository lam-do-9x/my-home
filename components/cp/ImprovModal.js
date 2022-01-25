import { XIcon } from "@heroicons/react/outline";
import MDRender from "./MDR";
import styles from "./CP.module.css";

export default function ImprovModal(props) {
  function close() {
    props.onClick();
  }

  return (
    <div className="opacity-200 fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center p-7 transition-opacity duration-300">
      <div className="flex max-w-xl flex-col rounded-lg bg-white shadow-2xl">
        <div className="my-2 flex w-full justify-end px-7">
          <XIcon
            className="h-5 w-5 cursor-pointer rounded-full border fill-current text-gray-700"
            onClick={close}
          />
        </div>
        <div
          className={`my-2 px-7 ${styles["max-h-modal"]} prose mb-4 overflow-x-hidden`}
        >
          <MDRender content={props.improvisation.content} />
        </div>
      </div>
    </div>
  );
}
