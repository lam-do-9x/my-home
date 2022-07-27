import Link from 'next/link'
import Layout from '@components/Layout'
import HomeBlog from '@components/HomeBlog'
import Nav from '@components/Nav'
import Header from '@components/Header'

const isLast = (blogs, index) => {
  const blogLength = blogs.length - 1
  return blogLength === index
}

export default function Index({ blogs }) {
  return (
    <Layout>
      <Header title="Lam Do" />
      <Nav />
      <div className="flex flex-col items-center justify-center px-6 py-8">
        <h1 className="mb-2	text-5xl font-bold uppercase text-gray-700">
          Latest Blog
        </h1>
        {blogs.map((blog, index) => (
          <HomeBlog
            blog={blog}
            key={blog.properties.slug.rich_text[0]?.plain_text}
            last={isLast(blogs, index)}
          />
        ))}
        {blogs.length === 5 && (
          <Link href="/blog">
            <button className="text-bold mt-2 border border-gray-600 p-4 text-2xl uppercase">
              See all blog
            </button>
          </Link>
        )}
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const { blogs } = await fetch(
    `${process.env.APP_URL}/api/blogs?page=home`
  ).then((res) => res.json())

  return {
    props: {
      blogs,
    },
  }
}
