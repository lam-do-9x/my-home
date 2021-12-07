import { getAllChildBlockNotion, pageNotion } from "../../../lib/notion";

export default async function handle(req, res) {
  const { id } = req.query;
  const blocks = await getAllChildBlockNotion(id);
  const page = await pageNotion(id);
  return res.json({ blocks, page, code: 200 });
}
