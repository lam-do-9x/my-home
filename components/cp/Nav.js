import Link from "next/link";

const open = (event) => {
  const accordionContent =
    event.target.parentElement.parentElement.querySelector(
      ".accordion-content"
    );
  let accordionMaxHeight = accordionContent.style.maxHeight;

  if (accordionMaxHeight == "0px" || accordionMaxHeight.length == 0) {
    accordionContent.style.maxHeight = `${
      accordionContent.scrollHeight + 32
    }px`;
    accordionContent.classList.remove("overflow-hidden");
  } else {
    accordionContent.style.maxHeight = `0px`;
    accordionContent.classList.add("overflow-hidden");
  }
};

const Nav = () => (
  <div className="w-64 p-6 overflow-y-auto border-r h-screen">
    <div className="-mx-3 p-3 text-sm font-medium flex flex-col rounded-lg cursor-pointer hover:bg-gray-100">
      <div
        className="flex rounded-lg justify-center items-center"
        onClick={open}
      >
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
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="text-gray-900 ml-4">English</span>
      </div>
      <div className="accordion-content overflow-hidden">
        <p className="leading-6 text-gray-900 border-t p-3 mt-2 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mx-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Dictionary
        </p>
        <p className="leading-6 text-gray-900 border-t p-3 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mx-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
            />
          </svg>
          Youglish
        </p>
        <p className="leading-6 text-gray-900 border-t p-3 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mx-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
            />
          </svg>
          Improv
        </p>
      </div>
    </div>
    <Link href="/cp/posts">
      <div className="-mx-3 p-3 text-sm font-medium flex rounded-lg justify-center items-center cursor-pointer hover:bg-gray-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
          <path
            fillRule="evenodd"
            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-gray-900 ml-4">Posts</span>
      </div>
    </Link>
    <Link href="/cp/receipts">
      <div className="-mx-3 p-3 text-sm font-medium flex rounded-lg justify-center items-center cursor-pointer hover:bg-gray-100">
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
            d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z"
          />
        </svg>
        <span className="text-gray-900 ml-4">Receipts</span>
      </div>
    </Link>
    <Link href="/cp/body-language">
      <div className="-mx-3 p-3 text-sm font-medium flex rounded-lg justify-center items-center cursor-pointer hover:bg-gray-100">
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
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
        <span className="text-gray-900 ml-4">Body Language</span>
      </div>
    </Link>
  </div>
);

export default Nav;
