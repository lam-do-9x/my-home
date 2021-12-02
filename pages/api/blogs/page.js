import { pageNotion } from "../../../lib/notion";

export default async function handle(req, res) {
  const { id } = req.query;
  const page = await pageNotion(id);
  return res.json({ page, code: 200 });
}
