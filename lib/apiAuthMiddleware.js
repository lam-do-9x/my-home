import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '../pages/api/auth/[...nextauth]'

export default function apiAuthMiddleware(handler) {
  return async function (req, res) {
    try {
      const session = await unstable_getServerSession(req, res, authOptions)

      if (session) return handler(req, res)

      return res.status(401).json({ message: 'Unauthorized', code: 401 })
    } catch (e) {
      console.log(e)
    }
  }
}
