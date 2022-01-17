import Layout from "../../../components/cp/Layout";
import { colorByEmotion } from "../../../components/cp/Emotion";
import Image from "next/image";

export default function BodyLanguage() {
  function _renderObject() {
    return Object.keys(colorByEmotion).map((emotion) => {
      return (
        <button
          className={`border border-1 rounded-full my-2 p-3 uppercase ${colorByEmotion[emotion]}`}
          key={emotion}
        >
          {emotion}
        </button>
      );
    });
  }

  return (
    <Layout>
      <div className="flex mx-6 my-6">
        <h2 className="flex mr-4 text-lg font-large uppercase rounded border p-2 max-w-fit">
          Body Language
        </h2>
      </div>
      <div className="flex mx-6 my-6 justify-center align-center">
        <div className="flex flex-col border border-2 p-2">
          {_renderObject()}
          <div className="border-t my-2">
            <button className="border border-1 rounded-full mx-1 my-2 p-3 uppercase">
              Start
            </button>
            <button className="border border-1 rounded-full mx-1 my-2 p-3 uppercase">
              Reset
            </button>
          </div>
        </div>
        <div className="m-8">
          <Image
            className="rounded-lg"
            src="https://res.cloudinary.com/leno/image/upload/v1611064712/body%20language/Practice/AnyConv.com__30bSAD_vdmhmd.jpg"
            width={500}
            height={500}
          />
        </div>
      </div>
    </Layout>
  );
}
