import { prisma } from "../../../lib/prisma";

export default async function handle(req, res) {
  const take = Number(req.query.take);
  let cursor = undefined;
  if (req.query.id !== "undefined") {
    cursor = { id: Number(req.query.id) };
  }
  const fashions = await prisma.fashion.findMany({
    take,
    cursor,
    orderBy: {
      id: "desc",
    },
  });

  const hasLoadMore = take === fashions.length;

  return res.json({ fashions, hasLoadMore, code: 200 });
}
