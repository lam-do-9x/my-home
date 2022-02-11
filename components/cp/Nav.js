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
  TemplateIcon,
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
    "/cp/communication/improvisation": "communication",
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
        className={`-mx-3 flex cursor-pointer flex-col rounded-lg p-3 text-sm font-medium ${
          show && section === "english" ? "" : "hover:bg-gray-300"
        }`}
      >
        <div className="flex flex-col items-center justify-center rounded-lg">
          <div
            className="flex w-full items-center justify-center"
            onClick={() => dropdown("english")}
          >
            <GlobeIcon className="h-6 w-6" />
            <span className="mx-4 text-gray-900">English</span>
            {show && section === "english" ? (
              <ChevronUpIcon className="h-4 w-4" />
            ) : (
              <ChevronDownIcon className="h-4 w-4" />
            )}
          </div>
          <div
            className={`mt-2 w-full ${
              show && section === "english" ? "" : "hidden"
            }`}
          >
            <ActiveLink
              activeClassName="bg-gray-100"
              href="/cp/english/dictionary"
            >
              <p className="flex items-center justify-center rounded-lg p-3 leading-6 text-gray-900 hover:bg-gray-100">
                <BookmarkAltIcon className="mr-2 h-6 w-6" />
                Dictionary
              </p>
            </ActiveLink>
            <ActiveLink
              activeClassName="bg-gray-100"
              href="/cp/english/youglish"
            >
              <p className="flex items-center justify-center rounded-lg p-3 leading-6 text-gray-900 hover:bg-gray-100">
                <FilmIcon className="mr-2 h-6 w-6" />
                Youglish
              </p>
            </ActiveLink>
            <ActiveLink
              activeClassName="bg-gray-100"
              href="/cp/english/pronunciation"
            >
              <p className="flex items-center justify-center rounded-lg p-3 leading-6 text-gray-900 hover:bg-gray-100">
                <VolumeUpIcon className="mr-2 h-6 w-6" />
                Pronunciation
              </p>
            </ActiveLink>
          </div>
        </div>
      </div>
      <ActiveLink activeClassName="bg-gray-100" href="/cp/receipts">
        <div
          className="-mx-3 flex cursor-pointer items-center justify-center rounded-lg p-3 text-sm font-medium hover:bg-gray-100"
          onClick={() => setShow(false)}
        >
          <ReceiptTaxIcon className="h-6 w-6" />
          <span className="ml-4 text-gray-900">Receipts</span>
        </div>
      </ActiveLink>
      <ActiveLink activeClassName="bg-gray-100" href="/cp/fashion">
        <div
          className="-mx-3 flex cursor-pointer items-center justify-center rounded-lg p-3 text-sm font-medium hover:bg-gray-100"
          onClick={() => setShow(false)}
        >
          <TemplateIcon className="h-6 w-6" />
          <span className="ml-4 text-gray-900">Fashion</span>
        </div>
      </ActiveLink>
      <div
        className={`-mx-3 flex cursor-pointer flex-col rounded-lg p-3 text-sm font-medium ${
          show && section === "communication" ? "" : "hover:bg-gray-100"
        }`}
      >
        <div className="flex flex-col items-center justify-center rounded-lg">
          <div
            className="flex w-full items-center justify-center"
            onClick={() => dropdown("communication")}
          >
            <ChatAlt2Icon className="h-6 w-6" />
            <span className="mx-4 text-gray-900">Communication</span>
            {show && section === "communication" ? (
              <ChevronUpIcon className="h-4 w-4" />
            ) : (
              <ChevronDownIcon className="h-4 w-4" />
            )}
          </div>
          <div
            className={`mt-2 w-full ${
              show && section === "communication" ? "" : "hidden"
            }`}
          >
            <ActiveLink
              activeClassName="bg-gray-100"
              href="/cp/communication/body-language"
            >
              <p className="flex items-center justify-center rounded-lg p-3 leading-6 text-gray-900 hover:bg-gray-100">
                <UserIcon className="h-6 w-6" />
                Body Language
              </p>
            </ActiveLink>
            <ActiveLink
              activeClassName="bg-gray-100"
              href="/cp/communication/improvisation"
            >
              <p className="flex items-center justify-center rounded-lg p-3 leading-6 text-gray-900 hover:bg-gray-100">
                <ChatIcon className="mr-2 h-6 w-6" />
                Improvisation
              </p>
            </ActiveLink>
          </div>
        </div>
      </div>
    </div>
  );
}
