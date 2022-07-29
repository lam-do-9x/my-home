import Link from 'next/link'
import Dotdotdot from 'react-dotdotdot'
import { formatDateMonthStr } from '@lib/dateTime'
import Layout from '@components/Layout'
import Nav from '@components/Nav'
import Header from '@components/Header'
import Image from '@components/Images'
import HeadOne from '@components/HeadOne'

const date = (dateStr) => {
  return formatDateMonthStr(dateStr, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function Index({ blogs }) {
  return (
    <Layout>
      <Header title="Lam Do" />
      <Nav />
      <div className="mx-auto">
        <HeadOne title="Latest Blog" className="text-5xl text-gray-700" />
        <ul>
          {blogs.map((blog) => (
            <li
              key={blog.id}
              className="border-b border-gray-300 last:border-none"
            >
              <Link
                href={`${blog.properties.slug.rich_text[0]?.plain_text}-${blog.id}`}
              >
                <div className="mt-4 flex w-full max-w-4xl cursor-pointer pb-4">
                  <Image
                    className="rounded-full"
                    src={
                      blog.cover ? blog.cover[blog.cover.type].url : undefined
                    }
                  />
                  <div className="flex w-1/3 flex-col items-center justify-center">
                    <p className="font-light text-gray-600">Date:</p>
                    <p className="w-full text-center font-medium text-gray-500">
                      {date(blog.properties.publishedDate?.date.start)}
                    </p>
                  </div>
                  <div className="flex w-2/3 flex-col items-start justify-center">
                    <p className="text-2xl font-bold text-gray-700">
                      {blog.properties.title.title[0].text.content}
                    </p>
                    <Dotdotdot clamp={4}>
                      <p className="mt-2 text-gray-600">
                        {blog.properties.excerpt.rich_text[0]?.plain_text}
                      </p>
                    </Dotdotdot>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
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
