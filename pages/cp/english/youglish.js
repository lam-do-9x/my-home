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
      const { dictionary } = await fetch(`/api/dictionaries/${id}`).then(
        (res) => res.json()
      );
      setDictionary(dictionary);
      setShowModal(true);
    }
  }

  return (
    <Layout>
      <div className="flex p-4">
        <h2 className="mx-2 text-lg font-bold uppercase rounded p-2 flex justify-center items-center">
          Youglish
          <div className="flex mx-2">
            <InformationCircleIcon
              className="h-5 w-5 mx-2"
              onClick={showWords}
            />

            <RefreshIcon className="h-5 w-5" onClick={changeYg} />
          </div>
        </h2>
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
