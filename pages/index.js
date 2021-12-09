import Link from "next/link";
import Main from "../components/Main";
import HomeBlog from "../components/HomeBlog";
import Nav from "../components/Nav";

const isLast = (blogs, index) => {
  const blogLength = blogs.length - 1;
  return blogLength === index;
};

export default function Index({ blogs }) {
  return (
    <Main>
      <Nav />
      <div className="px-6 flex flex-col items-center justify-center py-8">
        <h1 className="text-5xl	uppercase font-bold text-gray-700 mb-2">
          Latest Blog
        </h1>
        {blogs.map((blog, index) => (
          <HomeBlog
            blog={blog}
            key={blog.properties.slug.rich_text[0]?.plain_text}
            last={isLast(blogs, index)}
          />
        ))}
        {blogs.length === 5 && (
          <Link href="/blog">
            <button className="uppercase text-2xl text-bold border border-gray-600 p-4 mt-2">
              See all blog
            </button>
          </Link>
        )}
      </div>
    </Main>
  );
}

export async function getServerSideProps() {
  const { blogs } = await fetch(
    `${process.env.APP_URL}/api/blogs?page=home`
  ).then((res) => res.json());

  return {
    props: {
      blogs,
    },
  };
}
