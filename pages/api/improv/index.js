import { createPageNotion, databaseNotion } from "../../../lib/notion";

export default async function handle(req, res) {
  switch (req.method) {
    case "POST":
      handlePOST(req, res);
      break;
    case "GET":
      handleGET(req, res);
      break;
    default:
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      );
  }
}

async function handlePOST(req, res) {
  const database_id = process.env.NOTION_IMPROV_ID;

  let condition = {
    parent: { database_id },
    properties: {
      content: {
        title: [
          {
            text: {
              content: req.body.content,
            },
          },
        ],
      },
      display: {
        rich_text: [
          {
            text: {
              content: req.body.display,
            },
          },
        ],
      },
    },
  };

  const improv = await createPageNotion(condition);

  return res.json({ improv, code: 200 });
}

async function handleGET(req, res) {
  const id = process.env.NOTION_IMPROV_ID;

  let condition = {};

  if (req.query.q) {
    condition = {
      filter: {
        property: "content",
        text: {
          contains: req.query.q,
        },
      },
    };
  }

  const improvs = await databaseNotion(id, condition);

  return res.json({ improvs, code: 200 });
}
