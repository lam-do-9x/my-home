import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

function isValid(email, password) {
  if (process.env.ADMIN_EMAIL === email) {
    if (process.env.ADMIN_PASSWORD === password) {
      return true
    }
    throw new Error('Your password was wrong!')
  }
  throw new Error('Your email was incorrect!')
}

const providers = [
  CredentialsProvider({
    name: 'Credentials',
    authorize: async (credentials) => {
      try {
        if (isValid(credentials.email, credentials.password)) {
          return {
            status: 'success',
            data: { email: credentials.email, name: 'Lam Do' },
          }
        }
      } catch (e) {
        throw new Error(`${e}&email=${credentials.email}`)
      }
    },
  }),
]

export const authOptions = {
  providers,
  pages: {
    error: '/login',
  },
}

export default NextAuth(authOptions)
