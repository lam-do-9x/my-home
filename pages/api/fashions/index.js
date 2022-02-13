import { databaseNotion } from "../../../lib/notion";

export default async function handle(req, res) {
  const id = process.env.NOTION_FASHION_ID;
  const { page_size, start_cursor } = req.query;
  const { results, next_cursor } = await databaseNotion(id, {
    page_size: Number(page_size),
    start_cursor: start_cursor !== "undefined" ? start_cursor : undefined,
  });
  return res.json({ fashions: results, next_cursor, code: 200 });
}
