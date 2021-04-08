import Link from 'next/link'

const Nav = () => (
    <div className="w-64 p-6 overflow-y-auto border-r">
        <Link href="/posts">
            <div className="-mx-3 py-1 px-3 text-sm font-medium flex rounded-lg justify-center items-center cursor-pointer hover:bg-gray-200">
                <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span className="text-gray-900 ml-4">Posts</span>
            </div>
        </Link>
    </div>
);

export default Nav;
