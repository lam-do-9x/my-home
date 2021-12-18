import { prisma } from "../../../lib/prisma";

export default async function handle(req, res) {
  const operate = {
    where: {
      id: Number(req.query.id),
    },
    select: {
      word: true,
      content: true,
    },
  };

  const dictionary = await prisma.dictionary.findUnique(operate);
  return res.json({ dictionary, code: 200 });
}
