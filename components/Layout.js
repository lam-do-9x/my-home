import Head from 'next/head';
import Header from "./cp/Header";
import Nav from "./cp/Nav";

export default function Layout(props) {
    return (
        <div className="h-screen overflow-hidden flex flex-col w-full bg-gray-100">
            <Head>
                <title>Lam Do</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />
            <div className="flex-1 flex overflow-x-hidden ">
                <Nav />
                <main className="w-full">
                    {props.children}
                </main>
            </div>
        </div>
    )
};