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
            id: 1,
            email: credentials.email,
            name: 'Lam Do',
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
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      if (token) {
        session.id = token.id
      }
      return session
    },
  },
  session: {
    strategy: 'jwt',
  },
  jwt: {
    encryption: true,
    secret: process.env.JWT_SECRET,
  },
}

export default NextAuth(authOptions)
