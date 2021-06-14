import Link from 'next/link'

const Header = () => (
<header className="flex flex-shrink-0 w-full bg-white shadow border border-b">
    <Link href="/cp/posts">
        <div className="flex items-center justify-center px-4 py-3 w-64 cursor-pointer">
            <span className="ml-4 mt-2 text-4xl uppercase font-bold cursor-pointer">Leo Do</span>
        </div>
    </Link>
</header>);

export default Header;
