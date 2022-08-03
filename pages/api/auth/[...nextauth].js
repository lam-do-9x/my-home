import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

function isValid(email, password) {
  if (process.env.ADMIN_EMAIL === email) {
    if (process.env.ADMIN_PASSWORD === password) {
      return true
    }
    throw new Error('field=password&message=Your password was wrong!')
  }
  throw new Error('field=email&message=Your email was incorrect!')
}

const providers = [
  CredentialsProvider({
    name: 'Credentials',
    authorize: async (credentials) => {
      try {
        if (isValid(credentials.email, credentials.password)) {
          return {
            status: 200,
            ok: true,
          }
        }
      } catch (e) {
        throw new Error(e)
      }
    },
  }),
]

export const authOptions = {
  providers,
  secret: process.env.SECRET,
}

export default NextAuth(authOptions)
