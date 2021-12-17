import { databaseNotion } from "../../../lib/notion";
import { prisma } from "../../../lib/prisma";

export default async function handle(req, res) {
  const id = process.env.NOTION_DICTIONARY_ID;
  let dictionaries;
  if (req.query.page) {
    const dictionaryCount = await prisma.dictionary.count();
    const randomId = Math.ceil(Math.random() * (dictionaryCount - 1) + 1);

    dictionaries = await prisma.dictionary.findMany({
      select: {
        word: true,
        content: true,
      },
      where: {
        id: {
          equals: randomId,
        },
      },
    });
    return res.json({ dictionaries, code: 200 });
  }
  dictionaries = await databaseNotion(id, {
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
