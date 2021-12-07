import { getAllChildBlockNotion } from "../../../lib/notion";

export default async function handle(req, res) {
  const { id } = req.query;
  const blocks = await getAllChildBlockNotion(id);
  return res.json({ blocks, code: 200 });
}
