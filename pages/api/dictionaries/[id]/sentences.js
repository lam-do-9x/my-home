import { prisma } from '@lib/prisma'
import apiAuthMiddleware from '@lib/apiAuthMiddleware'

async function handle(req, res) {
    const dictionarySentence = await prisma.dictionarySentence.findMany({
        select: {
            sentence: {
                select: {
                    id: true,
                    title: true
                }
            }
        },
        where: {
            dictionaryId: Number(req.query.id)
        },
        distinct: ['sentenceId'],
    })

    const sentences = dictionarySentence.map((sentence) => {
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
