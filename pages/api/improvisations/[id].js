import { prisma } from '@lib/prisma'
import apiAuthMiddleware from '@lib/apiAuthMiddleware'

async function handle(req, res) {
  const improvisation = await prisma.improvisation.update({
    where: {
      id: Number(req.query.id),
    },
    data: req.body,
  })

  return res.json({ improvisation, code: 200 })
}

export default apiAuthMiddleware(handle)
