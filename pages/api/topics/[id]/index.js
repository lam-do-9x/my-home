import { prisma } from '@lib/prisma'
import apiAuthMiddleware from '@lib/apiAuthMiddleware'

async function handle(req, res) {
    const topicSentence = await prisma.topicSentence.findMany({
        where: {
            topicId: Number(req.query.id)
        },
        distinct: ['sentenceId'],
    })

    const topicSentenceIds = topicSentence.map(sentence => sentence.sentenceId)

    const sentencesUpdate = req.body.sentences

    const assignedAt = new Date()

    const sentences =  {
        deleteMany: {
            topicId: Number(req.query.id),
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

                if (!topicSentenceIds.includes(sentence.value)) {
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

    const { name, content } = req.body

    const topic = await prisma.topic.update({
        where: {
            id: Number(req.query.id),
        },
        data: {
            sentences,
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
