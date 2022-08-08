export default function apiAuthMiddleware(handler) {
  return async function (req, res) {
    try {
      return handler(req, res)
      //   return res.status(401).json({ message: 'Unauthorized', code: 401 })
    } catch (e) {
      console.log(e)
    }
  }
}
