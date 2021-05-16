import Head from 'next/head';
import Nav from './Nav';

export default function Main(props) {
    return (
        <div className="h-screen w-full flex flex-col bg-gray-100 overflow-x-hidden">
            <Head>
                <title>Lam Do</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Nav />
            <div className="px-6 py-8">
                <div className="w-full justify-center items-center flex flex-col">
                    <h1 className="text-5xl	uppercase font-bold text-gray-700">Latest Blog</h1>
                    <div className="mt-6">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    );
}
