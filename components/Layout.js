import Sidebar from '@components/Sidebar'

export default function Layout({ children }) {
  return (
    <div className="relative h-full min-h-screen w-full">
      <div className="flex flex-col">{children}</div>
    </div>
  )
}

export function CpLayout({ children }) {
  return (
    <Layout>
      <div className="flex">
        <Sidebar />
        <div className="min-h-screen w-full">{children}</div>
      </div>
    </Layout>
  )
}
