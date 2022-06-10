import { XIcon } from "@heroicons/react/outline";
import Image from "next/image";
import styles from "./CP.module.css";

export default function ImageModal(props) {
  function close() {
    props.onClick();
  }

  return (
    <div className={`fixed left-0 top-0 ${styles["modal"]} h-full w-full `}>
      <div className="mx-8 mt-2 block flex justify-end">
        <XIcon
          className="h-6 w-6 cursor-pointer fill-current text-white"
          onClick={close}
        />
      </div>
      <div className="relative h-screen w-screen">
        <Image
          className="object-contain pb-14"
          src={props.block.image}
          layout="fill"
        />
      </div>
    </div>
  );
}
