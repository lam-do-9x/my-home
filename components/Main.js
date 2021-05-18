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
            <div className="px-6 pb-8 w-full">
                <div className="justify-center items-center flex flex-col">
                    {props.children}
                </div>
            </div>
        </div>
    );
}
