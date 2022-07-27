import Head from 'next/head'
import Header from './Header'
import Nav from '../Sidebar'

export default function Layout(props) {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <Head>
        <title>Leo Do</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <div className="flex flex-1 overflow-x-auto">
        <Nav />
        <main className="w-full">{props.children}</main>
      </div>
    </div>
  )
}
