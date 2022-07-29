import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { ArrowCircleRightIcon } from '@heroicons/react/outline'
import useLoginForm from '@lib/hooks/useLoginForm'
import Layout from '@components/Layout'
import Header from '@components/Header'
import Nav from '@components/Nav'
import Input from '@components/form/Input'

export default function login() {
  const router = useRouter()
  const { data: session } = useSession()
  const [redirect, setRedirect] = useState('/cp/english/dictionary')
  const { state, handleChange, handleSubmit } = useLoginForm()
  const hasEmailAndPassword =
    state.input.email === '' || state.input.password === ''

  useEffect(async () => {
    if (!router.isReady) return
    const { redirect } = router.query
    if (redirect) {
      setRedirect(redirect)
    }
  }, [router.isReady])

  if (session) {
    router.push(redirect)
  }

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
