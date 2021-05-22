import Main from "../components/Main";
import DisplayPost from '../components/DisplayPost';
import Nav from '../components/Nav';

function Index({ posts }) {
    return (
        <Main>
            <Nav />
            <div className="px-6 flex flex-col items-center justify-center pt-4">
                <h1 className="text-5xl	uppercase font-bold text-gray-700">Latest Blog</h1>
                {posts.map(post => (
                    <DisplayPost post={post} key={post.id}/>
                ))}
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
