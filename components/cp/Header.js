import Link from 'next/link'

const Header = () => (
<header className="flex flex-shrink-0 w-full bg-white">
    <Link href="/cp">
        <div className="flex items-center justify-center px-4 py-3 w-64 cursor-pointer">
            <img className="h-8 w-8 rounded-full object-cover border" src="/favicon.ico" alt="" />
            <span className="ml-4 mt-2 text-lg font-medium text-black">Lam Do</span>
        </div>
    </Link>
</header>);

export default Header;
