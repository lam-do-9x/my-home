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

    const topicDictionary = await prisma.dictionaryTopic.findMany({
        where: {
            topicId: Number(req.query.id)
        },
        distinct: ['dictionaryId'],
    })

    const topicDictionaryIds = topicDictionary.map(dictionary => dictionary.dictionaryId)

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

    const dictionariesUpdate = req.body.dictionaries

    const dictionaries =  {
        deleteMany: {
            topicId: Number(req.query.id),
            dictionaryId: {
                notIn: dictionariesUpdate
                        .filter((dictionary) => !dictionary.__isNew__)
                        .map((dictionary ) => dictionary.value )
            }
        },
        create: dictionariesUpdate
            .map((dictionary ) => {
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

                if (!topicDictionaryIds.includes(dictionary.value)) {
                    return {
                        assignedAt,
                        dictionary: {
                            connect: {
                                id: dictionary.value,
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
            dictionaries,
            name,
            content
        },
    })

    return res.json({ topic, code: 200 })
}

export default apiAuthMiddleware(handle)

export const config = {
  api: {
    externalResolver: true,
  },
}
