import Head from 'next/head'

export default function Home() {
  return (
    <div className="w-full h-100">
      <Head>
        <title>Lam Do Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex justify-center">
        <p className="text-red-600">This is my blog</p>
      </main>

    </div>
  )
}
