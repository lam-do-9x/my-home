import { prisma, Prisma, prismaErrorCode } from '@lib/prisma'
import apiAuthMiddleware from '@lib/apiAuthMiddleware'

async function handle(req, res) {
  try {
    const sentence = await prisma.sentence.update({
      where: {
        id: Number(req.query.id),
      },
      data: req.body
    })

    return res.json({ sentence, code: 200 })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(e);
      return res.json({
        message: prismaErrorCode(e.code, e.meta.target[0]),
        code: 400,
      })
    }
  }
}

export default apiAuthMiddleware(handle)
