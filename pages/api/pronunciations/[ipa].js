import { prisma } from "../../../lib/prisma";

export default async function handle(req, res) {
  const operate = {
    where: {
      ipa: {
        contains: req.query.ipa,
      },
    },
    select: {
      word: true,
      pronunciation: true,
    },
  };

  const pronunciations = await prisma.dictionary.findMany(operate);
  return res.json({ pronunciations, code: 200 });
}
