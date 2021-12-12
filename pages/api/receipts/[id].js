import { AllChildBlockNotion } from "../../../lib/notion";

export default async function handle(req, res) {
  const { id } = req.query;
  const blocks = await new AllChildBlockNotion(id).get();
  return res.json({ blocks, code: 200 });
}
