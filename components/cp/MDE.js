import { useState } from "react";
import ReactMde from "react-mde";
import MDRender from "./MDR";
import uploadToCloudinary from "../../lib/uploadToCloudinary";
import "react-mde/lib/styles/css/react-mde-all.css";

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
        value={props.content}
        onChange={onChange}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(<MDRender content={markdown} />)
        }
        childProps={{
          writeButton: {
            tabIndex: -1,
          },
        }}
        paste={{
          saveImage: save,
        }}
        classes={{ preview: "h-6 overflow-x-hidden prose" }}
      />
    </div>
  );
}
