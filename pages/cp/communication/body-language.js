import Layout from "../../../components/cp/Layout";
import { colorByEmotion } from "../../../components/cp/Emotion";
import Image from "next/image";

export default function BodyLanguage() {
  function _renderObject() {
    return Object.keys(colorByEmotion).map((emotion) => {
      return (
        <button
          className={`border-1 my-2 rounded-full border p-3 uppercase ${colorByEmotion[emotion]}`}
          key={emotion}
        >
          {emotion}
        </button>
      );
    });
  }

  return (
    <Layout>
      <div className="mx-6 my-6 flex">
        <h2 className="font-large mr-4 flex max-w-fit rounded border p-2 text-lg uppercase">
          Body Language
        </h2>
      </div>
      <div className="align-center mx-6 my-6 flex justify-center">
        <div className="flex flex-col border border-2 p-2">
          {_renderObject()}
          <div className="my-2 border-t">
            <button className="border-1 mx-1 my-2 rounded-full border p-3 uppercase">
              Start
            </button>
            <button className="border-1 mx-1 my-2 rounded-full border p-3 uppercase">
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
