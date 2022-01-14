import { useState } from "react";
import { XCircleIcon, SaveIcon } from "@heroicons/react/outline";
import fetchClient from "../../lib/fetchClient";
import MDE from "./MDE";

export default function UpSetImpov(props) {
  const [content, setContent] = useState(props.improvisation.content);

  function close() {
    props.onClick();
  }

  async function submit() {
    const body = JSON.stringify({
      content,
      display: content.substr(0, 100),
    });

    if (Object.keys(props.improvisation).length !== 0) {
      await fetchClient(
        `/api/improvisations/${props.improvisation.id}`,
        body,
        "PATCH"
      );
    } else {
      await fetchClient("/api/improvisations", body);
    }

    close();
  }

  return (
    <div className="p-7 flex justify-center items-center fixed left-0 top-0 w-full h-full z-50 transition-opacity duration-300 opacity-100">
      <div className="w-3/4 max-w-xl mx-auto rounded-xl bg-white shadow-lg border p-5">
        <div className="overflow-hidden rounded-md">
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
