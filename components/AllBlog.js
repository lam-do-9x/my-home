import Link from 'next/link';
import { monthDate } from "../lib/handleDate";

export default function AllBlog(props) {
    return (
        <div className="w-full px-10 py-3 flex items-center justify-start">
            <div className="flex flex-col mx-8">
                <span className="text-xl text-gray-600 w-full">{monthDate(new Date(props.post.publishedDate))}</span>
            </div>
            <Link href={`/${props.post.slug}`}>
                <p className="text-xl text-blue-400 cursor-pointer hover:underline">{props.post.title}</p>
            </Link>
        </div>
    );
}
