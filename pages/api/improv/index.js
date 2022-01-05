import { createPageNotion } from "../../../lib/notion";

export default async function handle(req, res) {
  const database_id = process.env.NOTION_IMPROV_ID;
  const context = req.body.content;

  let condition = {
    parent: { database_id },
    properties: {
      content: {
        title: [
          {
            text: {
              content: context,
            },
          },
        ],
      },
    },
  };

  const improv = await createPageNotion(condition);

  return res.json({ improv, code: 200 });
}
