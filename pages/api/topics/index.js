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
    select: {
      id: true,
      name: true,
      content: true,
    },
    orderBy: [
       { name: 'asc'},
       { createdAt: 'desc'}
    ],
  }

  if (req.query.q) {
    operate = {
      where: {
        name: {
          contains: req.query.q,
        },
      },
      ...operate,
    }
  }

  const totalPage = await prisma.topic.count(operate)

  const pageCount = Math.ceil(totalPage.id / take)

  const topics = await prisma.topic.findMany({
    skip: !Number.isNaN(skip) ? skip : undefined,
    take: !Number.isNaN(take) ? take : undefined,
    ...operate
  })

  return res.json({ topics, pageCount, code: 200 })
}

async function handlePOST(req, res) {
  const assignedAt = new Date()

  const createSentences = req.body.sentences?.map((sentence) => {
    if (sentence.__isNew__) {
      return {
        assignedAt,
        sentence: {
          create: {
            title: sentence.value,
          },
        },
      }
    }

    return {
      assignedAt,
      sentence: {
        connect: {
          id: sentence.value,
        },
      },
    }
  })

  const createDictionaries = req.body.dictionaries?.map((dictionary) => {
    if (dictionary.__isNew__) {
      return {
        assignedAt,
        dictionary: {
          create: {
            word: dictionary.value,
          },
        },
      }
    }

    return {
      assignedAt,
      dictionary: {
        connect: {
          id: dictionary.value,
        },
      },
    }
  })

  const { name, content } = req.body

  const topic = await prisma.topic.create({
    data: {
      sentences: { create: createSentences },
      dictionaries: { create: createDictionaries },
      name,
      content
    },
  })

  return res.json({ topic, code: 201 })
}

export default apiAuthMiddleware(handle)

export const config = {
  api: {
    externalResolver: true,
  },
}
