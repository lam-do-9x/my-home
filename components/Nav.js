import Link from "next/link";

export default function Nav({post = {}}) {
    return (
        <nav className={`${Object.keys(post).length !== 0 ? 'absolute z-30' : 'shadow mb-4'} py-4 px-6 w-full`}>
            <div className="flex justify-between items-center container mx-auto">
                <Link href="/">
                    <div className={`${Object.keys(post).length !== 0 ? 'text-white' : ''} text-4xl uppercase font-bold cursor-pointer`}>Lam Do</div>
                </Link>
                <div className="flex justify-between items-center">
                    <Link href="/blog">
                        <p className={`my-1 mx-4 ${Object.keys(post).length !== 0 ? 'text-white' : ''} cursor-pointer`}>Blog</p>
                    </Link>
                    <a href="#" className={`my-1 mx-4 ${Object.keys(post).length !== 0 ? 'text-white' : ''}`}>About us</a>
                </div>
            </div>
        </nav>
    );

}
