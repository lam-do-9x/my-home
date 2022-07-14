import { prisma } from "../../../lib/prisma";

export default async function handle(req, res) {
  switch (req.method) {
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
  const selectedReceipt = {
    id: true,
    name: true,
    cover: true,
    notes: true,
    sessions: {
      select: {
        selected: true,
      },
    },
    methods: {
      select: {
        selected: true,
      },
    },
  };

  const take = Number(req.query.take);
  const skip = Number(req.query.skip);

  let operator = {
    orderBy: {
      id: "desc",
    },
  };

  const total = await prisma.receipt.count(operator);

  const pageCount = Math.ceil(total / take);

  const receipts = await prisma.receipt.findMany({
    take,
    skip,
    ...operator,
    select: selectedReceipt,
  });

  return res.json({ receipts, pageCount, code: 200 });
}
