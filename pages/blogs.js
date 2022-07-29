import Link from 'next/link'
import { formatDateMonthStr } from '@lib/dateTime'
import Layout from '@components/Layout'
import Header from '@components/Header'
import HeadOne from '@components/HeadOne'
import Nav from '@components/Nav'

const date = (dateStr) => {
  return formatDateMonthStr(dateStr, {
    month: 'long',
    day: 'numeric',
  })
}

export default function Blog({ blogs }) {
  return (
    <Layout>
      <Header title="All Blog" />
      <Nav />
      <div className="mx-auto">
        <HeadOne title="All Blog" className="text-5xl text-gray-700" />
        <div className="my-4">
          {blogs.map(({ year, data }) => {
            return (
              <ul key={year}>
                <p className="text-center text-3xl font-bold">{year}</p>
                {data.map((blog) => (
                  <li key={blog.id} className="flex w-full py-3">
                    <p className="w-1/3 text-xl text-gray-600">
                      {date(blog.properties.publishedDate?.date.start)}
                    </p>
                    <Link
                      href={`${blog.properties.slug.rich_text[0]?.plain_text}-${blog.id}`}
                    >
                      <p className="w-2/3 cursor-pointer text-xl text-blue-400 hover:underline">
                        {blog.properties.title.title[0].text.content}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
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
