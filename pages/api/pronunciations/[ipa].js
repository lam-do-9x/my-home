import { prisma } from '@lib/prisma'
import apiAuthMiddleware from '@lib/apiAuthMiddleware'

async function handle(req, res) {
  const operate = {
    where: {
      ipa: {
        contains: req.query.ipa,
      },
    },
    select: {
      word: true,
      pronunciation: true,
    },
  }

  const pronunciations = await prisma.dictionary.findMany(operate)
  return res.json({ pronunciations, code: 200 })
}

export default apiAuthMiddleware(handle)
