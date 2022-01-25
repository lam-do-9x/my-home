import Link from "next/link";
import Image from "next/image";
import Dotdotdot from "react-dotdotdot";
import { formatDate } from "../lib/dateTime";

export default function HomeBlog(props) {
  return (
    <Link
      href={`${props.blog.properties.slug.rich_text[0]?.plain_text}-${props.blog.id}`}
    >
      <div
        className={`mt-4 w-full max-w-4xl px-10 pb-4 ${
          props?.last ? "" : "border-b border-gray-300"
        } flex cursor-pointer`}
      >
        <Image
          className="rounded-full"
          src={
            props.blog.cover
              ? props.blog.cover[props.blog.cover.type].url
              : "/ngo-thanh-tung-pCTuLkx8erE-unsplash.jpg"
          }
          width={200}
          height={200}
        />
        <div className="flex w-1/3 flex-col items-center justify-center">
          <span className="font-bold text-gray-600">Date:</span>
          <span className="flex w-full items-center justify-center font-light text-gray-600">
            {formatDate(
              "dd-mm-yyyy",
              props.blog.properties.publishedDate?.date.start
            )}
          </span>
        </div>
        <div className="mt-2 flex w-2/3 flex-col items-start justify-center">
          <p className="text-2xl font-bold text-gray-700">
            {props.blog.properties.title.title[0].text.content}
          </p>
          <Dotdotdot clamp={4}>
            <p className="mt-2 text-gray-600">
              {props.blog.properties.excerpt.rich_text[0]?.plain_text}
            </p>
          </Dotdotdot>
        </div>
      </div>
    </Link>
  );
}
