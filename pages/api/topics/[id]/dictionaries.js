import { prisma } from '@lib/prisma'
import apiAuthMiddleware from '@lib/apiAuthMiddleware'

async function handle(req, res) {
    const dictionaryTopic = await prisma.dictionaryTopic.findMany({
        select: {
            dictionary: {
                select: {
                    id: true,
                    word: true
                }
            }
        },
        where: {
            topicId: Number(req.query.id)
        },
        distinct: ['dictionaryId'],
    })

    const dictionaries = dictionaryTopic.map((dictionary) => {
        return {
            value: dictionary.dictionary.id,
            label: dictionary.dictionary.word
        }
    })

    return res.json({ dictionaries, code: 200 })
}

export default apiAuthMiddleware(handle)

export const config = {
  api: {
    externalResolver: true,
  },
}
