import { prisma } from "../../../lib/prisma";

export default async function handle(req, res) {
  const skip = Number(req.query.skip);
  const take = Number(req.query.take);

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
      orderBy: {
        contentAt: "desc",
      },
    };
  }

  if (req.query.q) {
    operate = {
      where: {
        word: {
          contains: req.query.q,
        },
      },
      ...operate,
    };
  }

  const totalPage = await prisma.dictionary.count(operate);

  const pageCount = Math.ceil(totalPage / take);

  const dictionaries = await prisma.dictionary.findMany({
    skip,
    take,
    ...operate,
  });

  return res.json({ dictionaries, pageCount, code: 200 });
}
