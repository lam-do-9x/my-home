import Main from "../components/Main";
import DisplayPost from '../components/DisplayPost';
import Nav from '../components/Nav';
import Link from "next/link";

function Index({ posts }) {
    function isLast(posts, index) {
        const postLength =  posts.length - 1;
        return postLength === index;
    }

    return (
        <Main>
            <Nav />
            <div className="px-6 flex flex-col items-center justify-center pt-4">
                <h1 className="text-5xl	uppercase font-bold text-gray-700">Latest Blog</h1>
                {posts.map((post, index) => (
                    <DisplayPost post={post} key={post.id} last={isLast(posts, index)}/>
                ))}
                {   Object.keys(posts).length === 5 &&
                    <Link href='/blog'>
                        <button className="uppercase text-2xl text-bold border border-gray-600 p-4">See all blog</button>
                    </Link>
                }
            </div>
        </Main>
    )

}

export async function getStaticProps() {
    const res = await fetch(`${process.env.APP_URL}/api/posts?isPublished=true&take=5`);
    const { posts } =  await res.json();

    return { props: { posts } }
}

export default Index;
