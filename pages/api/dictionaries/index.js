import { prisma } from "../../../lib/prisma";

export default async function handle(req, res) {
  let operate = {
    orderBy: {
      word: "asc",
    },
  };

  if (req.query.page) {
    const dictionaryCount = await prisma.dictionary.count();
    const randomId = Math.ceil(Math.random() * (dictionaryCount - 1) + 1);

    operate = {
      select: {
        word: true,
        content: true,
      },
      where: {
        id: {
          equals: randomId,
        },
      },
    };
  }

  const dictionaries = await prisma.dictionary.findMany(operate);
  return res.json({ dictionaries, code: 200 });
}
