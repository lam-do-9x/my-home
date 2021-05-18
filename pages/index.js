import Main from "../components/Main";
import DisplayPost from '../components/DisplayPost';

function Index({ posts }) {
    return (
        <Main>
            <h1 className="text-5xl	uppercase font-bold text-gray-700">Latest Blog</h1>
            {posts.map(post => (
                <DisplayPost post={post} key={post.id}/>
            ))}
        </Main>
    )

}

export async function getStaticProps() {
    const res = await fetch(`${process.env.APP_URL}/api/posts`);
    const { posts } =  await res.json();

    return { props: { posts } }
}

export default Index;
