import { notion } from '../../../lib/notion';

export default async function handle(req, res) {
    const { block_id } = req.query;
    const pageContent = await notion.blocks.children.list({ block_id });
    return res.json({ blocks: pageContent.results, code: 200 });
}
