import { useState } from "react";
import Link from "next/link";
import {
  GlobeIcon,
  BookmarkAltIcon,
  FilmIcon,
  DocumentIcon,
  ReceiptTaxIcon,
  UserIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/outline";

export default function Nav() {
  const [show, setShow] = useState(false);

  return (
    <div className="w-64 p-6 overflow-y-auto border-r h-screen">
      <div
        className={`-mx-3 p-3 text-sm font-medium flex flex-col rounded-lg cursor-pointer ${
          show ? "" : "hover:bg-gray-100"
        }`}
      >
        <div className="flex flex-col rounded-lg justify-center items-center">
          <div
            className="flex w-full justify-center items-center"
            onClick={() => setShow(!show)}
          >
            <GlobeIcon className="h-6 w-6" />
            <span className="text-gray-900 mx-4">English</span>
            {show ? (
              <ChevronUpIcon className="h-4 w-4" />
            ) : (
              <ChevronDownIcon className="h-4 w-4" />
            )}
          </div>
          <div className={`w-full mt-2 ${show ? "" : "hidden"}`}>
            <p className="leading-6 text-gray-900 p-3 flex items-center justify-center hover:bg-gray-100 rounded-lg">
              <BookmarkAltIcon className="h-6 w-6 mr-2" />
              Dictionary
            </p>
            <p className="leading-6 text-gray-900 p-3 flex items-center justify-center hover:bg-gray-100 rounded-lg">
              <FilmIcon className="h-6 w-6 mr-2" />
              Youglish
            </p>
          </div>
        </div>
      </div>
      <Link href="/cp/posts">
        <div
          className="-mx-3 p-3 text-sm font-medium flex rounded-lg justify-center items-center cursor-pointer hover:bg-gray-100"
          onClick={() => setShow(false)}
        >
          <DocumentIcon className="h-6 w-6" />
          <span className="text-gray-900 ml-4">Posts</span>
        </div>
      </Link>
      <Link href="/cp/receipts">
        <div
          className="-mx-3 p-3 text-sm font-medium flex rounded-lg justify-center items-center cursor-pointer hover:bg-gray-100"
          onClick={() => setShow(false)}
        >
          <ReceiptTaxIcon className="h-6 w-6" />
          <span className="text-gray-900 ml-4">Receipts</span>
        </div>
      </Link>
      <Link href="/cp/body-language">
        <div
          className="-mx-3 p-3 text-sm font-medium flex rounded-lg justify-center items-center cursor-pointer hover:bg-gray-100"
          onClick={() => setShow(false)}
        >
          <UserIcon className="h-6 w-6" />
          <span className="text-gray-900 ml-4">Body Language</span>
        </div>
      </Link>
    </div>
  );
}
