import { databaseNotion } from "../../../lib/notion";

export default async function handle(req, res) {
  const id = process.env.NOTION_RECEIPT_ID;
  const receipts = await databaseNotion(id, {});
  return res.json({ receipts, code: 200 });
}
