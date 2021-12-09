import Main from "../components/Main";
import AllBlog from "../components/AllBlog";
import Nav from "../components/Nav";

export default function Blog({ blogs }) {
  return (
    <Main>
      <Nav />
      <div className="px-6 flex flex-col items-center justify-center py-8">
        <h1 className="text-5xl	uppercase font-bold text-gray-700 mb-8">
          All Blog
        </h1>
        <div className="max-w-4xl w-full">
          {blogs.map(({ year, data }) => {
            return (
              <div className="flex flex-col items-center" key={year}>
                <div className="text-3xl font-bold">{year}</div>
                {data.map((blog) => {
                  return (
                    <AllBlog
                      blog={blog}
                      key={blog.properties.slug.rich_text[0]?.plain_text}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </Main>
  );
}

export async function getServerSideProps() {
  const { blogs } = await fetch(`${process.env.APP_URL}/api/blogs`).then(
    (res) => res.json()
  );

  return {
    props: {
      blogs,
    },
  };
}
