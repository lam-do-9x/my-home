import Main from "../components/Main";
import DisplayPost from "../components/DisplayPost";
import Nav from "../components/Nav";
import Link from "next/link";
import { notion } from "../lib/notion";

export default function Index({ blogs }) {
  function isLast(blogs, index) {
    const blogLength = blogs.length - 1;
    return blogLength === index;
  }

  return (
    <Main>
      <Nav />
      <div className="px-6 flex flex-col items-center justify-center py-8">
        <h1 className="text-5xl	uppercase font-bold text-gray-700 mb-2">
          Latest Blog
        </h1>
        {blogs.map((blog, index) => (
          <DisplayPost
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

export async function getStaticProps() {
  const { results } = await notion.databases.query({
    database_id: process.env.NOTION_BLOG_ID,
    filter: {
      property: "isPublished",
      select: {
        equals: "Yes",
      },
    },
    sorts: [
      {
        property: "publishedDate",
        direction: "descending",
      },
    ],
    page_size: 5,
  });

  return {
    props: {
      blogs: results,
    },
  };
}
