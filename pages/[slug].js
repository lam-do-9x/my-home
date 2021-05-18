import Main from "../components/Main";
import Image from 'next/image'

export default function slug({post}) {
    return (
        <Main>
            <div className="fixed">
                <Image className=" top-0 left-0 absolute min-w-full	min-h-full bg-center" src="https://markmanson.net/wp-content/uploads/2019/06/attention-diet-cover-image.jpg" layout="fill" objectFit="cover" />
            </div>
            <div className="mx-auto px-56 container">
                <div className='mb-4 h-screen justify-center flex flex-col items-center'>
                    <div>{post.title}</div>
                    <div>{post.excerpt}</div>
                </div>
                <div>{post.content}</div>
            </div>
        </Main>
    );
}

export const getServerSideProps = async ({ params }) => {
    const res = await fetch(`${process.env.APP_URL}/api/posts/${params.slug}?column=slug`);
    const { post } = await res.json();

    return { props: { post } }
}
