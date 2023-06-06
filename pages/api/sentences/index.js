import { prisma } from '@lib/prisma'
import apiAuthMiddleware from '@lib/apiAuthMiddleware'

async function handle(req, res) {
  const skip = Number(req.query.skip)
  const take = Number(req.query.take)

  const operate = {
    orderBy: {
      title: 'asc',
    },
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

export default apiAuthMiddleware(handle)

export const config = {
  api: {
    externalResolver: true,
  },
}
