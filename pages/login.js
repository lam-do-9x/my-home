import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from '@lib/session'
import { ArrowCircleRightIcon } from '@heroicons/react/outline'
import useLoginForm from '@lib/hooks/useLoginForm'
import Layout from '@components/Layout'
import Header from '@components/Header'
import Nav from '@components/Nav'
import Input from '@components/form/Input'

export default function login({ session }) {
  const router = useRouter()
  const { state, handleChange, handleSubmit } = useLoginForm()
  const hasEmailAndPassword =
    state.input.email === '' || state.input.password === ''

  useEffect(async () => {
    if (!router.isReady) return
    const redirect = router.query.redirect ?? '/cp/english/dictionary'
    if (session) {
      router.push(redirect)
    }
  }, [router.isReady])

  return (
    <Layout>
      <Header title="Login to admin" />
      <Nav />
      <div className="flex h-screen items-center justify-center">
        <div className="w-full max-w-md rounded-md border bg-white px-4 py-8 shadow">
          <div className="text-center text-xl font-medium uppercase text-gray-800">
            Login To Admin
          </div>
          <form onSubmit={handleSubmit}>
            <Input
              label="Email"
              type="email"
              required={true}
              placeholder="Email Address"
              handleChange={handleChange}
              state={state}
            />
            <Input
              label="Password"
              type="password"
              required={true}
              placeholder="Password"
              handleChange={handleChange}
              state={state}
            />
            <button
              type="submit"
              className={`${
                hasEmailAndPassword ? 'cursor-not-allowed' : ''
              } mt-4 flex w-full items-center justify-center rounded bg-gray-300 py-2 text-sm text-white transition duration-150 ease-in hover:bg-gray-500 focus:outline-none`}
              disabled={hasEmailAndPassword}
            >
              <span className="mr-2 uppercase">Login</span>
              <ArrowCircleRightIcon className="h-6 w-6" />
            </button>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = withIronSessionSsr(async function ({ req }) {
  const user = req.session.user

  const props = {}

  if (user) {
    props['session'] = user
  }

  return { props }
}, sessionOptions)
