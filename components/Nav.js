import Link from "next/link";

export default function Nav({ page = {} }) {
  return (
    <nav
      className={`${
        Object.keys(page).length !== 0 ? "absolute z-30" : "mb-4 shadow"
      } w-full py-4 px-6`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <div
            className={`${
              Object.keys(page).length !== 0 ? "text-white" : ""
            } cursor-pointer text-4xl font-bold uppercase`}
          >
            Leo Do
          </div>
        </Link>
        <div className="flex items-center justify-between">
          <Link href="/blog">
            <p
              className={`my-1 mx-4 ${
                Object.keys(page).length !== 0 ? "text-white" : ""
              } cursor-pointer`}
            >
              Blog
            </p>
          </Link>
          <a
            href="#"
            className={`my-1 mx-4 ${
              Object.keys(page).length !== 0 ? "text-white" : ""
            }`}
          >
            About me
          </a>
        </div>
      </div>
    </nav>
  );
}
