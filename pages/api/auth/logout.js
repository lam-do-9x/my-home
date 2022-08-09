import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '@lib/session'

export default withIronSessionApiRoute(handle, sessionOptions)

function handle(req, res) {
  req.session.destroy()
  res.json({ code: 200, message: 'Logout Success!' })
}
