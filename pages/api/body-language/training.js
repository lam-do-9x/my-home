import { prisma } from '@lib/prisma'
import apiAuthMiddleware from '@lib/apiAuthMiddleware'

async function handle(req, res) {
  switch (req.method) {
    case 'POST':
      handlePOST(req, res)
      break
    default:
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      )
  }
}

async function handlePOST(req, res) {
  const { count } = await prisma.bodyLanguageExam.createMany({
    data: [...req.body],
  })

  return res.json({ count, code: 201 })
}

export default apiAuthMiddleware(handle)
