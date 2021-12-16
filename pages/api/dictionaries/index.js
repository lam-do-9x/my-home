import { databaseNotion } from "../../../lib/notion";

export default async function handle(req, res) {
  const id = process.env.NOTION_DICTIONARY_ID;
  const dictionaries = await databaseNotion(id, {
    sorts: [
      {
        property: "word",
        direction: "ascending",
      },
    ],
    page_size: 10,
  });
  return res.json({ dictionaries, code: 200 });
}
