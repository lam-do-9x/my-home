import { updatePageNotion } from "../../../lib/notion";

export default async function handle(req, res) {
  switch (req.method) {
    case "PATCH":
      handlePATCH(req, res);
      break;
    default:
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      );
  }
}

async function handlePATCH(req, res) {
  const id = req.query.id;

  let condition = {
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

  const improv = await updatePageNotion(id, condition);

  return res.json({ improv, code: 200 });
}
