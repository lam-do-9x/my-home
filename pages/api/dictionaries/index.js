import { prisma } from "../../../lib/prisma";

export default async function handle(req, res) {
  let operate = {
    orderBy: {
      word: "asc",
    },
  };

  if (req.query.page) {
    const now = new Date();
    const workDays = new Date(now.setDate(now.getDate() - 5));

    operate = {
      where: {
        contentAt: {
          gte: workDays,
        },
      },
      select: {
        word: true,
        content: true,
      },
      orderBy: {
        contentAt: "desc",
      },
      take: 25,
    };
  }

  if (req.query.q) {
    operate = {
      where: {
        word: {
          contains: req.query.q,
        },
      },
    };
  }

  const dictionaries = await prisma.dictionary.findMany(operate);
  return res.json({ dictionaries, code: 200 });
}
