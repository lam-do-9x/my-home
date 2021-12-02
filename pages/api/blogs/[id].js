import { childBlockNotion } from "../../../lib/notion";

const blocks = [];

const getChildBlockNotion = async (id, cursor = "") => {
  const response = await childBlockNotion(id, cursor);
  blocks.push(...response.results);
  if (response.has_more) {
    await getChildBlockNotion(id, response.next_cursor);
  }
  return blocks;
};

export default async function handle(req, res) {
  const { id } = req.query;
  const blocks = await getChildBlockNotion(id);
  return res.json({ blocks, code: 200 });
}
