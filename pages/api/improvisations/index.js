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

async function handlePOST(req, res) {
  const improvisation = await prisma.improvisation.create({
    data: req.body,
  });

  return res.json({ improvisation, code: 201 });
}

async function handleGET(req, res) {
  const skip = Number(req.query.skip);
  const take = Number(req.query.take);

  let operate = {
    orderBy: {
      createdAt: "desc",
    },
  };

  if (req.query.q) {
    operate = {
      where: {
        content: {
          contains: req.query.q,
        },
      },
      ...operate,
    };
  }

  const totalPage = await prisma.improvisation.count(operate);

  const pageCount = Math.ceil(totalPage / take);

  const improvisations = await prisma.improvisation.findMany({
    skip,
    take,
    ...operate,
  });

  return res.json({ improvisations, pageCount, code: 200 });
}
