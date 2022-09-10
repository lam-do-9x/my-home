import { prisma } from '@lib/prisma'
import apiAuthMiddleware from '@lib/apiAuthMiddleware'

async function handle(req, res) {
  const skip = Number(req.query.skip)
  const take = Number(req.query.take)

  let operate = {
    orderBy: {
      word: 'asc',
    },
  }

  let where = {
    where: {
      NOT: { contentAt: null },
    },
  }

  if (req.query.page) {
    operate = {
      ...where,
      orderBy: {
        contentAt: 'desc',
      },
    }
  }

  if (req.query.page && req.query.time) {
    const now = new Date()
    const time = Number(req.query.time)
    if (!Number.isNaN(time)) {
      const workDays = new Date(now.setDate(now.getDate() - time))
      where = {
        where: {
          contentAt: {
            gte: workDays,
          },
        },
      }
    }

    operate = {
      ...where,
      orderBy: {
        contentAt: 'desc',
      },
    }
  }

  if (req.query.q) {
    operate = {
      where: {
        word: {
          contains: req.query.q,
        },
      },
      ...operate,
    }
  }

  const totalPage = await prisma.dictionary.count(operate)

  const pageCount = Math.ceil(totalPage / take)

  const dictionaries = await prisma.dictionary.findMany({
    skip: !Number.isNaN(skip) ? skip : undefined,
    take: !Number.isNaN(take) ? take : undefined,
    ...operate,
  })

  return res.json({ dictionaries, pageCount, code: 200 })
}

export default apiAuthMiddleware(handle)

export const config = {
  api: {
    externalResolver: true,
  },
}
