import Main from "../components/Main";
import AllBlog from '../components/AllBlog';
import Nav from '../components/Nav';
import { getYear } from "../lib/handleDate"

export default function Blog({ posts }) {
    return (
        <Main>
            <Nav />
            <div className="px-6 flex flex-col items-center justify-center pt-4">
                <h1 className="text-5xl	uppercase font-bold text-gray-700 mb-8">All Blog</h1>
                <div>
                    {posts.map(({year, data}) => {
                        return (
                            <div className="flex flex-col items-center" key={year}>
                                <div className="text-3xl font-bold">{year}</div>
                                {data.map(post => {
                                    return (<AllBlog post={post} key={post.slug} />)
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
        </Main>
    )
}

function tranformBlogByYear(blogs) {
    return blogs.reduce((blogByYear, blog) => {
        let year = getYear(blog.publishedDate);
        const isExist = blogByYear.find(b => b.year === year);
        if (!isExist) {
            blogByYear.push({ year, data: [blog] });
        } else {
            isExist['data'].push(blog);
        }

        return blogByYear;
    }, []);
}

export async function getStaticProps() {
    const res = await fetch(`${process.env.APP_URL}/api/posts?isPublished=true`);
    let { posts } = await res.json();
    posts = tranformBlogByYear(posts);
    return { props: { posts } }
}
