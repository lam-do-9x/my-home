import Image from 'next/image'
import Link from 'next/link'
import Dotdotdot from 'react-dotdotdot'
import { formatDate} from "../lib/handleDate"

export default function DisplayPost(props) {
    return (
        <Link href={`/${props.post.slug}`}>
            <div className={`max-w-4xl px-10 py-6 my-4 ${props.last ? '' : 'border-b border-gray-300'} flex items-center justify-center cursor-pointer`}>
                <Image className="rounded-full" src="https://markmanson.net/wp-content/uploads/2021/04/documentary-cover-250x250.jpg" width={400} height={400}/>
                <div className="flex flex-col mx-8 w-2/3">
                    <span className="font-bold text-gray-600">Date:</span>
                    <span className="font-light text-gray-600 w-full">{formatDate(new Date(props.post.publishedDate))}</span>
                </div>
                <div className="mt-2">
                    <p className="text-2xl text-gray-700 font-bold">{props.post.title}</p>
                    <Dotdotdot clamp={4}>
                        <p className="mt-2 text-gray-600">{props.post.content}</p>
                    </Dotdotdot>
                </div>
            </div>
        </Link>
    );
}
