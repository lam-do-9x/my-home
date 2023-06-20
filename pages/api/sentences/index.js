import { prisma } from '@lib/prisma'
import apiAuthMiddleware from '@lib/apiAuthMiddleware'

async function handle(req, res) {
  switch (req.method) {
    case 'GET':
      handleGET(req, res)
      break
    case 'POST':
      handlePOST(req, res)
      break
    default:
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      )
  }
}

async function handleGET(req, res) {
  const skip = Number(req.query.skip)
  const take = Number(req.query.take)

  let operate = {
    orderBy: {
      title: 'asc',
    },
  }

  if (req.query.q) {
    operate = {
      where: {
        OR: [
            { title: { contains: req.query.q} },
            { content: { contains: req.query.q } },
        ],
      },
      ...operate,
    }
  }

  const totalPage = await prisma.sentence.count(operate)

  const pageCount = Math.ceil(totalPage / take)

  const sentences = await prisma.sentence.findMany({
    skip: !Number.isNaN(skip) ? skip : undefined,
    take: !Number.isNaN(take) ? take : undefined,
    ...operate,
  })

  return res.json({ sentences, pageCount, code: 200 })
}

async function handlePOST(req, res) {
  try {
    const sentence = await prisma.sentence.create({data: req.body})

    return res.json({ sentence, code: 200 })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return res.json({
        message: prismaErrorCode(e.code, e.meta.target[0]),
        code: 400,
      })
    }
  }
}

export default apiAuthMiddleware(handle)

export const config = {
  api: {
    externalResolver: true,
  },
}
