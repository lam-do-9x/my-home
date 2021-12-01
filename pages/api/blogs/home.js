import { databaseNotion } from "../../../lib/notion";

export default async function handle(req, res) {
  const id = process.env.NOTION_BLOG_ID;
  const condition = {
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
  };

  const blogs = await databaseNotion(id, condition);

  return res.json({ blogs, code: 200 });
}
