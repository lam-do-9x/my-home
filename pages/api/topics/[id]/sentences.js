import { prisma } from '@lib/prisma'
import apiAuthMiddleware from '@lib/apiAuthMiddleware'

async function handle(req, res) {
    const sentences = await prisma.topicSentence.findMany({
        select: {
            sentence: {
                select: {
                    title: true
                }
            }
        },
        where: {
            topicId: Number(req.query.id)
        },
        distinct: ['sentenceId'],
    })

    return res.json({ sentences, code: 200 })
}

export default apiAuthMiddleware(handle)

export const config = {
  api: {
    externalResolver: true,
  },
}
