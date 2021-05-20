export default function Nav({post = {}}) {
    return (
        <nav className={`${Object.keys(post).length !== 0 ? 'absolute z-30' : 'shadow mb-4'} py-4 px-6 w-full`}>
            <div className="flex justify-between items-center container mx-auto">
                <a href="/" className={`${Object.keys(post).length !== 0 ? 'text-white' : ''} text-4xl uppercase font-bold`}>Lam Do</a>
                <div className="flex justify-between items-center">
                    <a href="#" className={`my-1 mx-4 ${Object.keys(post).length !== 0 ? 'text-white' : ''}`}>Blog</a>
                    <a href="#" className={`my-1 mx-4 ${Object.keys(post).length !== 0 ? 'text-white' : ''}`}>About us</a>
                </div>
            </div>
        </nav>
    );

}
