import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  GlobeIcon,
  BookmarkAltIcon,
  FilmIcon,
  ReceiptTaxIcon,
  UserIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  VolumeUpIcon,
  ChatAlt2Icon,
  ChatIcon,
} from "@heroicons/react/outline";
import ActiveLink from "./ActiveLink";

export default function Nav() {
  const { pathname } = useRouter();
  const [show, setShow] = useState(false);
  const [section, setSection] = useState(undefined);
  const pathShow = {
    "/cp/english/youglish": "english",
    "/cp/english/dictionary": "english",
    "/cp/english/pronunciation": "english",
    "/cp/communication/body-language": "communication",
    "/cp/communication/improv": "communication",
  };

  useEffect(() => {
    if (pathShow[pathname]) {
      setShow(true);
      setSection(pathShow[pathname]);
    }
  }, []);

  function dropdown(currentSection) {
    setShow(true);
    if (show === true && section === currentSection) {
      setShow(false);
    }
    setSection(currentSection);
  }

  return (
    <div className="w-64 p-6">
      <div
        className={`-mx-3 p-3 text-sm font-medium flex flex-col rounded-lg cursor-pointer ${
          show && section === "english" ? "" : "hover:bg-gray-300"
        }`}
      >
        <div className="flex flex-col rounded-lg justify-center items-center">
          <div
            className="flex w-full justify-center items-center"
            onClick={() => dropdown("english")}
          >
            <GlobeIcon className="h-6 w-6" />
            <span className="text-gray-900 mx-4">English</span>
            {show && section === "english" ? (
              <ChevronUpIcon className="h-4 w-4" />
            ) : (
              <ChevronDownIcon className="h-4 w-4" />
            )}
          </div>
          <div
            className={`w-full mt-2 ${
              show && section === "english" ? "" : "hidden"
            }`}
          >
            <ActiveLink
              activeClassName="bg-gray-100"
              href="/cp/english/dictionary"
            >
              <p className="leading-6 text-gray-900 p-3 flex items-center justify-center hover:bg-gray-100 rounded-lg">
                <BookmarkAltIcon className="h-6 w-6 mr-2" />
                Dictionary
              </p>
            </ActiveLink>
            <ActiveLink
              activeClassName="bg-gray-100"
              href="/cp/english/youglish"
            >
              <p className="leading-6 text-gray-900 p-3 flex items-center justify-center hover:bg-gray-100 rounded-lg">
                <FilmIcon className="h-6 w-6 mr-2" />
                Youglish
              </p>
            </ActiveLink>
            <ActiveLink
              activeClassName="bg-gray-100"
              href="/cp/english/pronunciation"
            >
              <p className="leading-6 text-gray-900 p-3 flex items-center justify-center hover:bg-gray-100 rounded-lg">
                <VolumeUpIcon className="h-6 w-6 mr-2" />
                Pronunciation
              </p>
            </ActiveLink>
          </div>
        </div>
      </div>
      <ActiveLink activeClassName="bg-gray-100" href="/cp/receipts">
        <div
          className="-mx-3 p-3 text-sm font-medium flex rounded-lg justify-center items-center cursor-pointer hover:bg-gray-100"
          onClick={() => setShow(false)}
        >
          <ReceiptTaxIcon className="h-6 w-6" />
          <span className="text-gray-900 ml-4">Receipts</span>
        </div>
      </ActiveLink>
      <div
        className={`-mx-3 p-3 text-sm font-medium flex flex-col rounded-lg cursor-pointer ${
          show && section === "communication" ? "" : "hover:bg-gray-100"
        }`}
      >
        <div className="flex flex-col rounded-lg justify-center items-center">
          <div
            className="flex w-full justify-center items-center"
            onClick={() => dropdown("communication")}
          >
            <ChatAlt2Icon className="h-6 w-6" />
            <span className="text-gray-900 mx-4">Communication</span>
            {show && section === "communication" ? (
              <ChevronUpIcon className="h-4 w-4" />
            ) : (
              <ChevronDownIcon className="h-4 w-4" />
            )}
          </div>
          <div
            className={`w-full mt-2 ${
              show && section === "communication" ? "" : "hidden"
            }`}
          >
            <ActiveLink
              activeClassName="bg-gray-100"
              href="/cp/communication/body-language"
            >
              <p className="leading-6 text-gray-900 p-3 flex items-center justify-center hover:bg-gray-100 rounded-lg">
                <UserIcon className="h-6 w-6" />
                Body Language
              </p>
            </ActiveLink>
            <ActiveLink
              activeClassName="bg-gray-100"
              href="/cp/communication/improv"
            >
              <p className="leading-6 text-gray-900 p-3 flex items-center justify-center hover:bg-gray-100 rounded-lg">
                <ChatIcon className="h-6 w-6 mr-2" />
                Improv
              </p>
            </ActiveLink>
          </div>
        </div>
      </div>
    </div>
  );
}
