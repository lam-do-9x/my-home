import { databaseNotion } from "../../../lib/notion";

const transformBlogByYear = (blogs) => {
  return blogs.reduce((transform, blog) => {
    let year = new Date(blog.properties.publishedDate.date.start).getFullYear();

    const isExist = transform.find((b) => b.year === year);

    if (!isExist) {
      transform.push({ year, data: [blog] });
    } else {
      isExist["data"].push(blog);
    }

    return transform;
  }, []);
};

export default async function handle(req, res) {
  const id = process.env.NOTION_BLOG_ID;
  let body = {
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
  };
  if (req.query.page) {
    body = { ...body, page_size: 5 };
  }

  const { results } = await databaseNotion(id, body);
  let blogs = transformBlogByYear(results);

  if (req.query.page) {
    blogs = results;
  }

  return res.json({ blogs, code: 200 });
}
