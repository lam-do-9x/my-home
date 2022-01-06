import { useState } from "react";
import { XCircleIcon, SaveIcon } from "@heroicons/react/outline";
import fetchClient from "../../lib/fetchClient";
import MDE from "./MDE";
// import Notification from "./Notification";

export default function UpSetImpov(props) {
  const [content, setContent] = useState(props.improv?.content);
  //   const [response, setResponse] = useState({});

  function close(improv) {
    props.onClick(improv);
  }

  async function submit() {
    const body = JSON.stringify({
      content,
    });
    let response = {};
    if (Object.keys(props.improv).length !== 0) {
      response = await fetchClient(
        `/api/dictionaries/${props.dictionary.id}`,
        body,
        "PUT"
      );
    } else {
      response = await fetchClient("/api/improv", body);
    }

    close(response.improv);
  }

  return (
    <div className="p-7 flex justify-center items-center fixed left-0 top-0 w-full h-full z-50 transition-opacity duration-300 opacity-100">
      <div className="w-3/4 max-w-xl mx-auto rounded-xl bg-white shadow-lg border p-5">
        <div className="overflow-hidden rounded-md">
          {/* <Notification response={response} /> */}
          <div className="w-full mb-4">
            <p className="mb-2 font-semibold text-xl">Content</p>
            <MDE
              content={content}
              onChange={(content) => setContent(content)}
            />
          </div>
          <div className="flex justify-end">
            <button className="border p-3 mx-2 rounded-full" onClick={submit}>
              <SaveIcon className="h-5 w-5" />
            </button>
            <button className="border p-3 mx-2 rounded-full" onClick={close}>
              <XCircleIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
