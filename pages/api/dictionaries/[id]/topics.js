import { prisma } from '@lib/prisma'
import apiAuthMiddleware from '@lib/apiAuthMiddleware'

async function handle(req, res) {
    const dictionaryTopic = await prisma.dictionaryTopic.findMany({
        select: {
            topic: {
                select: {
                    id: true,
                    name: true
                }
            }
        },
        where: {
            dictionaryId: Number(req.query.id)
        },
        distinct: ['topicId'],
    })

    const topics = dictionaryTopic.map((topic) => {
        return {
            value: topic.topic.id,
            label: topic.topic.name
        }
    })

    return res.json({ topics, code: 200 })
}

export default apiAuthMiddleware(handle)

export const config = {
  api: {
    externalResolver: true,
  },
}
