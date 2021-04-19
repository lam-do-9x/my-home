import Link from 'next/link'

const Nav = () => (
    <div className="w-64 p-6 overflow-y-auto border-r">
        <Link href="/posts">
            <div className="-mx-3 py-1 px-3 text-sm font-medium flex rounded-lg justify-center items-center cursor-pointer hover:bg-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-900 ml-4">Posts</span>
            </div>
        </Link>
    </div>
);

export default Nav;
