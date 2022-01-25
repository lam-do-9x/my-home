import { useState, useEffect } from "react";
import {
  InformationCircleIcon,
  RefreshIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";
import Layout from "../../../components/cp/Layout";
import Modal from "../../../components/cp/Modal";
import WordInDays from "../../../components/cp/WordInDays";
import { AuthMiddleware } from "../../../middleware/auth";
import { formatDate } from "../../../lib/dateTime";

function Youglish() {
  const [show, setShow] = useState(false);
  const [dictionaries, setDictionaries] = useState([]);
  const [dictionary, setDictionary] = useState([]);
  const [showModal, setShowModal] = useState(false);

  function showWords() {
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

  function fetchYg(word) {
    /* eslint-disable no-undef */
    YG.Widget("yg-widget").fetch(word, "english");
  }

  async function initYg() {
    const dictionaries = await fetchRandom();
    fetchYg(dictionaries[0].word);
  }

  function changeYg() {
    const index = Math.floor(Math.random() * dictionaries.length);
    fetchYg(dictionaries[index].word);
  }

  useEffect(async () => {
    const script = document.createElement("script");
    script.src = "https://youglish.com/public/emb/widget.js";
    script.async = true;
    script.onload = () => initYg();

    document.body.appendChild(script);
  }, []);

  async function clickWordInDay(show, id) {
    setShow(show);

    if (id) {
      const dictionary = dictionaries.find((d) => d.id === id);

      setDictionary(dictionary);

      setShowModal(true);
    }
  }

  return (
    <Layout>
      <div className="flex py-4">
        <h2 className="font-large flex max-w-min rounded border p-2 text-lg uppercase">
          Youglish
        </h2>
        <div className="mx-2 flex items-center justify-center">
          <InformationCircleIcon className="mx-1 h-5 w-5" onClick={showWords} />
          <RefreshIcon className="mx-1 h-5 w-5" onClick={changeYg} />
        </div>
        <a
          className="mx-2 flex items-center justify-center rounded bg-gray-100 p-2 text-center font-bold text-gray-500 hover:bg-gray-200"
          href={`https://youglish.com/lesson/video/${formatDate("dd-mm-yyyy")}`}
          target="_blank"
          rel="noreferrer"
        >
          Daily Lesson
        </a>
        <a
          className="mx-2 flex items-center justify-center rounded bg-gray-100 p-2 font-bold text-gray-500 hover:bg-gray-200"
          href="https://www.youtube.com/playlist?list=WL"
          target="_blank"
          rel="noreferrer"
        >
          <VideoCameraIcon className="mx-2 h-5 w-5" />
          Youtube
        </a>
        {showModal && (
          <Modal dictionary={dictionary} onClick={() => setShowModal(false)} />
        )}
        {show && (
          <WordInDays
            words={dictionaries}
            showModal={showModal}
            onClick={(show, id = null) => clickWordInDay(show, id)}
          />
        )}
      </div>
      <div id="yg-widget"></div>
    </Layout>
  );
}

export default AuthMiddleware(Youglish);
