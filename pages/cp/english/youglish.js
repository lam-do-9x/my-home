import { useEffect } from "react";
import Layout from "../../../components/Layout";
import { AuthMiddleware } from "../../../middleware/auth";

function Youglish() {
  useEffect(() => {
    /* eslint-disable no-undef */
    new YG.Widget("yg-widget").fetch("hello", "english");
  }, []);

  return (
    <Layout>
      <div className="flex p-4">
        <h2 className="mx-2 text-lg font-bold uppercase rounded p-2">
          Youglish
        </h2>
        <a
          className="bg-gray-100 hover:bg-gray-200 text-gray-500 text-center font-bold rounded p-2"
          href="https://youglish.com/lesson/video/"
          target="_blank"
          id="yg-daily-lesson"
          rel="noreferrer"
        >
          Daily Lesson
        </a>
      </div>
      <div id="yg-widget"></div>
      <script
        async
        src="https://youglish.com/public/emb/widget.js"
        charSet="utf-8"
      ></script>
    </Layout>
  );
}

export default AuthMiddleware(Youglish);
