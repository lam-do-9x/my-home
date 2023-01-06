import { prisma } from '@lib/prisma'
import apiAuthMiddleware from '@lib/apiAuthMiddleware'

async function handle(req, res) {
  const skip = Number(req.query.skip)
  const take = Number(req.query.take)

  let operate = {
    orderBy: {
      name: 'asc',
    },
    select: {
      id: true,
      name: true,
    },
  }

  const totalPage = await prisma.topic.count(operate)

  const pageCount = Math.ceil(totalPage / take)

  const topics = await prisma.topic.findMany({
    skip: !Number.isNaN(skip) ? skip : undefined,
    take: !Number.isNaN(take) ? take : undefined,
    ...operate,
  })

  return res.json({ topics, pageCount, code: 200 })
}

export default apiAuthMiddleware(handle)

export const config = {
  api: {
    externalResolver: true,
  },
}
