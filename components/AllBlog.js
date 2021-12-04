import { monthDate } from "../lib/dateTime";

export default function AllBlog(props) {
  return (
    <div className="w-full px-10 py-3 flex">
      <span className="text-xl text-gray-600 w-1/3">
        {monthDate(new Date(props.blog.properties.publishedDate?.date.start))}
      </span>
      <a
        href={`${props.blog.properties.slug.rich_text[0]?.plain_text}-${props.blog.id}`}
        className="w-2/3"
      >
        <p className="text-xl text-blue-400 cursor-pointer hover:underline">
          {props.blog.properties.title.title[0].text.content}
        </p>
      </a>
    </div>
  );
}
