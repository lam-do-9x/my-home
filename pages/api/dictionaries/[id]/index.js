import { prisma, Prisma, prismaErrorCode } from '@lib/prisma'
import apiAuthMiddleware from '@lib/apiAuthMiddleware'

async function handle(req, res) {
  try {
    const dictionarySentence = await prisma.dictionarySentence.findMany({
        where: {
            dictionaryId: Number(req.query.id)
        },
        distinct: ['sentenceId'],
    })

    const dictionarySentenceIds = dictionarySentence.map(sentence => sentence.sentenceId)

    const sentencesUpdate = req.body.sentences

    const assignedAt = new Date()

    const sentences =  {
        deleteMany: {
            dictionaryId: Number(req.query.id),
            sentenceId: {
                notIn: sentencesUpdate
                        .filter((sentence) => !sentence.__isNew__)
                        .map((sentence ) => sentence.value )
            }
        },
        create: sentencesUpdate
            .map((sentence ) => {
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

                if (!dictionarySentenceIds.includes(sentence.value)) {
                    return {
                        assignedAt,
                        sentence: {
                            connect: {
                                id: sentence.value,
                            },
                        },
                    }
                }
            })
    }

    const { word, content, contentAt } = req.body

    const dictionary = await prisma.dictionary.update({
      where: {
        id: Number(req.query.id),
      },
      data: {
            sentences,
            word,
            content,
            contentAt
        },
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

export default apiAuthMiddleware(handle)
