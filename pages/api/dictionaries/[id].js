import { prisma, Prisma, prismaErrorCode } from "../../../lib/prisma";

export default async function handle(req, res) {
  switch (req.method) {
    case "PUT":
      handlePUT(req, res);
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
  const operate = {
    where: {
      id: Number(req.query.id),
    },
    select: {
      id: true,
      word: true,
      content: true,
      contentAt: true,
    },
  };

  const dictionary = await prisma.dictionary.findUnique(operate);
  return res.json({ dictionary, code: 200 });
}

async function handlePUT(req, res) {
  try {
    const dictionary = await prisma.dictionary.update({
      where: {
        id: Number(req.query.id),
      },
      data: req.body,
    });
    return res.json({ dictionary, code: 201 });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return res.json({
        message: prismaErrorCode(e.code, e.meta.target[0]),
        code: 400,
      });
    }
  }
}
