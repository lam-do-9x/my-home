import { useState } from "react";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import uploadToCloudinary from "../../lib/uploadToCloudinary";
import "react-mde/lib/styles/css/react-mde-all.css";

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

const videoCommand = {
  name: "video",
  icon: () => (
    <span role="img" aria-label="video">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
    </span>
  ),
  execute: (opts) => {
    opts.textApi.replaceSelection(
      '[![IMAGE ALT TEXT](http://img.youtube.com/vi/YOUTUBE_VIDEO_ID_HERE/0.jpg)](http://www.youtube.com/embed/YOUTUBE_VIDEO_ID_HERE "Video Title")'
    );
  },
};

export default function MDE(props) {
  const [selectedTab, setSelectedTab] = useState("write");

  const save = async function* () {
    // Promise that waits for "time" milliseconds
    const wait = function (time) {
      return new Promise((a) => {
        setTimeout(() => a(), time);
      });
    };

    await wait(2000);

    const file = document.querySelector(".image-input").files[0];

    yield uploadToCloudinary(process.env.NEXT_PUBLIC_CLOUDINARY_API, file).then(
      (data) => data.secure_url
    );

    await wait(2000);

    return true;
  };

  function onChange(type) {
    props.onChange(type);
  }

  return (
    <div className="container">
      <ReactMde
        commands={{
          video: videoCommand,
        }}
        toolbarCommands={[
          ["header", "bold", "italic", "strikethrough", "quote"],
          ["link", "image", "video", "code"],
          ["unordered-list", "ordered-list", "checked-list"],
        ]}
        value={props.content}
        onChange={onChange}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        childProps={{
          writeButton: {
            tabIndex: -1,
          },
        }}
        paste={{
          saveImage: save,
        }}
      />
    </div>
  );
}
