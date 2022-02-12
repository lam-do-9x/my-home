import { databaseNotion } from "../../../lib/notion";

export default async function handle(req, res) {
  const id = process.env.NOTION_FASHION_ID;
  const { results } = await databaseNotion(id, {});
  return res.json({ fashions: results, code: 200 });
}
