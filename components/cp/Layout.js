import Head from "next/head";
import Header from "./Header";
import Nav from "./Nav";

export default function Layout(props) {
  return (
    <div className="h-screen overflow-hidden flex flex-col w-full">
      <Head>
        <title>Leo Do</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <div className="flex-1 flex overflow-x-auto">
        <Nav />
        <main className="w-full">{props.children}</main>
      </div>
    </div>
  );
}
