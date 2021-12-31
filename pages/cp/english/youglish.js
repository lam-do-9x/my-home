import { useState, useEffect } from "react";
import {
  InformationCircleIcon,
  RefreshIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";
import Layout from "../../../components/cp/Layout";
// import Modal from "../../../components/cp/Modal";
import WordInDays from "../../../components/cp/WordInDays";
import { AuthMiddleware } from "../../../middleware/auth";
import { formatDate } from "../../../lib/dateTime";

function Youglish() {
  const [show, setShow] = useState(false);
  const [dictionaries, setDictionaries] = useState([]);

  function showModal() {
    setShow(true);
    /* eslint-disable no-undef */
    YG.Widget("yg-widget").pause();
  }

  async function fetchRandom() {
    const { dictionaries } = await fetch("/api/dictionaries?page=yg").then(
      (res) => res.json()
    );
    setDictionaries(dictionaries);
    return dictionaries;
  }

  async function changeYg() {
    const dictionaries = await fetchRandom();
    /* eslint-disable no-undef */
    YG.Widget("yg-widget").fetch(dictionaries[0].word, "english");
  }

  useEffect(async () => {
    const script = document.createElement("script");
    script.src = "https://youglish.com/public/emb/widget.js";
    script.async = true;
    script.onload = () => changeYg();

    document.body.appendChild(script);
  }, []);

  return (
    <Layout>
      <div className="flex p-4">
        <h2 className="mx-2 text-lg font-bold uppercase rounded p-2 flex justify-center items-center">
          Youglish
          <div className="flex mx-2">
            <InformationCircleIcon
              className="h-5 w-5 mx-2"
              onClick={showModal}
            />

            <RefreshIcon className="h-5 w-5" onClick={changeYg} />
          </div>
        </h2>
        {/* {show && (
              <Modal dictionary={dictionary} onClick={() => setShow(false)} />
            )} */}
        {show && (
          <WordInDays words={dictionaries} onClick={() => setShow(false)} />
        )}
        <a
          className="bg-gray-100 hover:bg-gray-200 text-gray-500 text-center font-bold rounded p-2"
          href={`https://youglish.com/lesson/video/${formatDate("dd-mm-yyyy")}`}
          target="_blank"
          rel="noreferrer"
        >
          Daily Lesson
        </a>
        <a
          className="bg-gray-100 hover:bg-gray-200 text-gray-500 font-bold rounded p-2 mx-2 flex justify-center items-center"
          href="https://www.youtube.com/playlist?list=WL"
          target="_blank"
          rel="noreferrer"
        >
          <VideoCameraIcon className="h-5 w-5 mx-2" />
          Youtube
        </a>
      </div>
      <div id="yg-widget"></div>
    </Layout>
  );
}

export default AuthMiddleware(Youglish);
