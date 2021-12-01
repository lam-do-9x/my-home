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
  const body = {
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

  const response = await databaseNotion(id, body);
  const blogs = transformBlogByYear(response);

  return res.json({ blogs, code: 200 });
}
