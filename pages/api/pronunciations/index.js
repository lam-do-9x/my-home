import { databaseNotion } from "../../../lib/notion";

export default async function handle(req, res) {
  const id = process.env.NOTION_PRONUNCIATION_ID;
  let body = {
    sorts: [
      {
        property: "type",
        direction: "descending",
      },
    ],
  };

  const pronunciations = await databaseNotion(id, body);

  return res.json({ pronunciations, code: 200 });
}
