import Link from 'next/link'
import Dotdotdot from 'react-dotdotdot'
import Image from '@components/Images'
import { formatDateMonthStr } from '../lib/dateTime'

export default function LatestBlog({ blog, last }) {
  const date = formatDateMonthStr(blog.properties.publishedDate?.date.start, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Link href={`${blog.properties.slug.rich_text[0]?.plain_text}-${blog.id}`}>
      <div
        className={`mt-4 w-full max-w-4xl pb-4 ${
          last ? '' : 'border-b border-gray-300'
        } flex cursor-pointer`}
      >
        <Image
          className="rounded-full"
          src={blog.cover ? blog.cover[blog.cover.type].url : undefined}
        />
        <div className="flex w-1/3 flex-col items-center justify-center">
          <p className="font-light text-gray-600">Date:</p>
          <p className="w-full text-center font-medium text-gray-500">{date}</p>
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
  )
}
