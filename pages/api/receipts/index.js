import { databaseNotion } from "../../../lib/notion";

export default async function handle(req, res) {
  const id = process.env.NOTION_RECEIPT_ID;
  const { results } = await databaseNotion(id, {});
  return res.json({ receipts: results, code: 200 });
}
