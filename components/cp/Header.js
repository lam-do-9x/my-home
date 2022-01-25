import Link from "next/link";

const Header = () => (
  <header className="flex w-full flex-shrink-0 border border-b bg-white shadow">
    <Link href="/cp/english/dictionary">
      <div className="flex w-64 cursor-pointer items-center justify-center px-4 py-3">
        <span className="ml-4 mt-2 cursor-pointer text-4xl font-bold uppercase">
          Leo Do
        </span>
      </div>
    </Link>
  </header>
);

export default Header;
