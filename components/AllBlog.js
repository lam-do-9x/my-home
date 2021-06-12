import Link from 'next/link';
import { monthDate } from "../lib/handleDate";

export default function AllBlog(props) {
    return (
        <div className="w-full px-10 py-3 flex">
            <span className="text-xl text-gray-600 w-1/3">{monthDate(new Date(props.post.publishedDate))}</span>
            <Link href={`/${props.post.slug}`}>
                <div className="w-2/3">
                    <p className="text-xl text-blue-400 cursor-pointer hover:underline">{props.post.title}</p>
                </div>
            </Link>
        </div>
    );
}
