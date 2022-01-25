import Head from "next/head";

export default function Main(props) {
  return (
    <div className="h-screen w-full">
      <Head>
        <title>Leo Do</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col">{props.children}</div>
    </div>
  );
}
