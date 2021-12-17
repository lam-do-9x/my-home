import { useEffect } from "react";
import Layout from "../../../components/cp/Layout";
import { AuthMiddleware } from "../../../middleware/auth";
import { formatDate } from "../../../lib/dateTime";

function Youglish() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://youglish.com/public/emb/widget.js";
    script.async = true;
    script.onload = () =>
      /* eslint-disable no-undef */
      new YG.Widget("yg-widget").fetch("hello", "english");
    document.body.appendChild(script);
  }, []);

  return (
    <Layout>
      <div className="flex p-4">
        <h2 className="mx-2 text-lg font-bold uppercase rounded p-2">
          Youglish
        </h2>
        <a
          className="bg-gray-100 hover:bg-gray-200 text-gray-500 text-center font-bold rounded p-2"
          href={`https://youglish.com/lesson/video/${formatDate("dd-mm-yyyy")}`}
          target="_blank"
          rel="noreferrer"
        >
          Daily Lesson
        </a>
      </div>
      <div id="yg-widget"></div>
    </Layout>
  );
}

export default AuthMiddleware(Youglish);
