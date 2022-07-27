import Link from 'next/link'
import Layout from '@components/Layout'
import LatestBlog from '@components/LatestBlog'
import Nav from '@components/Nav'
import Header from '@components/Header'

const isLast = (blogs, index) => {
  return blogs.length - 1 === index
}

export default function Index({ blogs }) {
  return (
    <Layout>
      <Header title="Lam Do" />
      <Nav />
      <div className="mx-auto p-4">
        <h1 className="mb-2	text-center text-5xl font-bold uppercase text-gray-700">
          Latest Blog
        </h1>
        {blogs.map((blog, index) => (
          <LatestBlog blog={blog} key={blog.id} last={isLast(blogs, index)} />
        ))}
        {blogs.length === 5 && (
          <Link href="/blog">
            <button className="text-bold border border-gray-600 p-4 text-2xl uppercase">
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
