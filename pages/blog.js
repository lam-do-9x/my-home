import Layout from '@components/Layout'
import Header from '@components/Header'
import Nav from '@components/Nav'
import AllBlog from '@components/AllBlog'

export default function Blog({ blogs }) {
  return (
    <Layout>
      <Header title="All Blog" />
      <Nav />
      <div className="mx-auto p-4">
        <h1 className="mb-2	text-center text-5xl font-bold uppercase text-gray-700">
          All Blog
        </h1>
        <div className="mt-4 w-full">
          {blogs.map(({ year, data }) => {
            return (
              <div className="flex flex-col items-center" key={year}>
                <div className="text-3xl font-bold">{year}</div>
                {data.map((blog) => {
                  return <AllBlog blog={blog} key={blog.id} />
                })}
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const { blogs } = await fetch(`${process.env.APP_URL}/api/blogs`).then(
    (res) => res.json()
  )

  return {
    props: {
      blogs,
    },
  }
}
