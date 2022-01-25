import { useState } from "react";
import { XIcon, XCircleIcon, SaveIcon } from "@heroicons/react/outline";
import fetchClient from "../../lib/fetchClient";
import MDE from "./MDE";
import Notification from "./Notification";

export default function UpSetModal(props) {
  const [content, setContent] = useState(props.dictionary.content);
  const [word, setWord] = useState(props.dictionary.word);
  const [response, setResponse] = useState({});

  function close(dictionary = {}) {
    props.onClick(dictionary);
  }

  async function submit() {
    const body = JSON.stringify({
      word: word.trim(),
      content,
      contentAt: props.dictionary.contentAt ?? new Date(),
    });

    let response = {};

    if (Object.keys(props.dictionary).length !== 0) {
      response = await fetchClient(
        `/api/dictionaries/${props.dictionary.id}`,
        body,
        "PUT"
      );
    } else {
      response = await fetchClient("/api/dictionaries", body);
    }

    if (response.code === 400) {
      setResponse(response);

      setTimeout(() => {
        setResponse({});
      }, 3000);

      return;
    }

    close(response.dictionary);
  }

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center p-7 opacity-100 transition-opacity duration-300">
      <div className="mx-auto w-3/4 max-w-xl rounded-xl border bg-white p-5 shadow-lg">
        <div className="overflow-hidden rounded-md">
          <Notification response={response} />
          <div className="mb-2 flex justify-between font-semibold">
            <div className="text-xl">
              Word<i className="ml-sm text-red-500">*</i>
            </div>
            <div className="cursor-pointer rounded-full border p-1">
              <XIcon className="h-5 w-5" onClick={close} />
            </div>
          </div>
          <input
            className="mb-4 w-full border p-2"
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
          <div className="mb-4 w-full">
            <p className="mb-2 text-xl font-semibold">Content</p>
            <MDE
              content={content}
              onChange={(content) => setContent(content)}
            />
          </div>
          <div className="flex justify-end">
            <button className="mx-2 rounded-full border p-3" onClick={submit}>
              <SaveIcon className="h-5 w-5" />
            </button>
            <button
              className="mx-2 rounded-full border p-3"
              onClick={() => close()}
            >
              <XCircleIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
