import Link from "next/link";
import { monthDate } from "../lib/dateTime";

export default function AllBlog(props) {
  return (
    <div className="flex w-full px-10 py-3">
      <span className="w-1/3 text-xl text-gray-600">
        {monthDate(new Date(props.blog.properties.publishedDate?.date.start))}
      </span>
      <Link
        href={`${props.blog.properties.slug.rich_text[0]?.plain_text}-${props.blog.id}`}
      >
        <p className="w-2/3 cursor-pointer text-xl text-blue-400 hover:underline">
          {props.blog.properties.title.title[0].text.content}
        </p>
      </Link>
    </div>
  );
}
