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
  const context = req.body.content;

  let condition = {
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

  const improv = await updatePageNotion(id, condition);

  return res.json({ improv, code: 200 });
}
