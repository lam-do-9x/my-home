import { prisma } from "../../../lib/prisma";

export default async function handle(req, res) {
  switch (req.method) {
    case "POST":
      handlePOST(req, res);
      break;
    case "GET":
      handleGET(req, res);
      break;
    default:
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      );
  }
}

async function handleGET(req, res) {
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

async function handlePOST(req, res) {
  const fashion = await prisma.fashion.create({
    data: req.body,
  });

  return res.json({ fashion, code: 201 });
}
