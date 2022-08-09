export default function apiAuthMiddleware(handler) {
  return async function (req, res) {
    try {
      const session = req.headers.cookie.includes('iron-session')

      if (session) return handler(req, res)

      throw new Error('Unauthorized')
    } catch (e) {
      res.status(401).json({ message: 'Unauthorized' })
    }
  }
}
