import { prisma } from '@lib/prisma'
import apiAuthMiddleware from '@lib/apiAuthMiddleware'

async function handle(req, res) {
    const topicSentence = await prisma.topicSentence.findMany({
        select: {
            sentence: {
                select: {
                    id: true,
                    title: true
                }
            }
        },
        where: {
            topicId: Number(req.query.id)
        },
        distinct: ['sentenceId'],
    })

    const sentences = topicSentence.map((sentence) => {
        return {
            value: sentence.sentence.id,
            label: sentence.sentence.title
        }
    })

    return res.json({ sentences, code: 200 })
}

export default apiAuthMiddleware(handle)

export const config = {
  api: {
    externalResolver: true,
  },
}
