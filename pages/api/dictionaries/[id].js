import { prisma, Prisma, prismaErrorCode } from '@lib/prisma'

export default async function handle(req, res) {
  try {
    const dictionary = await prisma.dictionary.update({
      where: {
        id: Number(req.query.id),
      },
      data: req.body,
    })

    return res.json({ dictionary, code: 200 })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return res.json({
        message: prismaErrorCode(e.code, e.meta.target[0]),
        code: 400,
      })
    }
  }
}
