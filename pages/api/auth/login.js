import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '@lib/session'
import { getContentByField } from '@lib/string'

export default withIronSessionApiRoute(handle, sessionOptions)

function isValid(email, password) {
  if (process.env.ADMIN_EMAIL === email) {
    if (process.env.ADMIN_PASSWORD === password) {
      return true
    }
    throw new Error('password')
  }
  throw new Error('email')
}

const messageByFiled = {
  email: 'Your email was incorrect!',
  password: 'Your password was wrong!',
}

async function handle(req, res) {
  try {
    const { email, password } = req.body
    const redirect = req.headers.referer.includes('redirect=')
      ? getContentByField(req.headers.referer, 'redirect=')
      : '/cp/english/dictionary'
    if (isValid(email, password)) {
      const user = {
        username: 'Lam Do',
        email: req.body.email,
      }
      req.session.user = user
      await req.session.save()
      res.json({ code: 200, message: 'Authenticated Succeed!', redirect })
    }
  } catch (error) {
    res.status(401).json({
      code: 401,
      message: 'Authenticated Failed!',
      error: {
        field: error.message,
        message: messageByFiled[error.message],
      },
    })
  }
}
