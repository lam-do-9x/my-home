import { useState } from "react";
import { XCircleIcon, SaveIcon } from "@heroicons/react/outline";
import fetchClient from "../../lib/fetchClient";
import MDE from "./MDE";

export default function UpSetImpov(props) {
  const [content, setContent] = useState(props.improvisation.content);

  function close(improvisation = {}) {
    props.onClick(improvisation);
  }

  async function submit() {
    const body = JSON.stringify({
      content,
      display: content.substr(0, 100),
    });

    let response = {};

    if (Object.keys(props.improvisation).length !== 0) {
      response = await fetchClient(
        `/api/improvisations/${props.improvisation.id}`,
        body,
        "PATCH"
      );
    } else {
      await fetchClient("/api/improvisations", body);
    }

    close(response.improvisation);
  }

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center p-7 opacity-100 transition-opacity duration-300">
      <div className="mx-auto w-3/4 max-w-xl rounded-xl border bg-white p-5 shadow-lg">
        <div className="overflow-hidden rounded-md">
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
