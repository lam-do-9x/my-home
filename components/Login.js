import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import {
  AtSymbolIcon,
  LockClosedIcon,
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
} from '@heroicons/react/outline'
import Notification from './cp/Notification'

export default function Login({ redirectTo }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoginStarted, setIsLoginStarted] = useState(false)
  const [loginError, setLoginError] = useState({})
  const router = useRouter()

  useEffect(() => {
    const error = router.query.error
    if (error) {
      setEmail(router.query.email)
      const message = error.split('Error:')[1]
      const loginErrorObject = { message, code: 401 }
      setLoginError(loginErrorObject)
      setTimeout(() => {
        setLoginError({})
      }, 3000)
    }
  }, [router])

  async function handleLogin(e) {
    e.preventDefault()
    setIsLoginStarted(true)
    await signIn('credentials', {
      email,
      password,
      callbackUrl: `${window.location.origin}${redirectTo}`,
    })
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {Object.keys(loginError).length !== 0 && (
        <Notification response={loginError} />
      )}
      <div className="flex w-full max-w-md flex-col rounded-md border bg-white px-4 py-8 shadow">
        <div className="self-center text-xl font-medium uppercase text-gray-800 sm:text-2xl">
          Login To Admin
        </div>
        <div className="mt-10">
          <form onSubmit={(e) => handleLogin(e)}>
            <div className="mb-6 flex flex-col">
              <label
                htmlFor="email"
                className="mb-1 text-xs tracking-wide text-gray-600 sm:text-sm"
              >
                Email:
              </label>
              <div className="relative">
                <div className="absolute left-0 top-0 inline-flex h-full w-10 items-center justify-center text-gray-400">
                  <AtSymbolIcon className="h-6 w-6" />
                </div>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  name="email"
                  className="w-full rounded-lg border border-gray-400 py-2 pl-10 pr-4 text-sm placeholder-gray-500 focus:border-blue-400 focus:outline-none sm:text-base"
                  placeholder="Email Address"
                  value={email || ''}
                />
              </div>
            </div>
            <div className="mb-6 flex flex-col">
              <label
                htmlFor="password"
                className="mb-1 text-xs tracking-wide text-gray-600 sm:text-sm"
              >
                Password:
              </label>
              <div className="relative">
                <div className="absolute left-0 top-0 inline-flex h-full w-10 items-center justify-center text-gray-400">
                  <LockClosedIcon className="h-6 w-6" />
                </div>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  className="w-full rounded-lg border border-gray-400 py-2 pl-10 pr-4 text-sm placeholder-gray-500 focus:border-blue-400 focus:outline-none sm:text-base"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="flex w-full">
              <Link href="/">
                <button
                  type="button"
                  className="mr-2 flex w-full items-center justify-center rounded bg-gray-600 py-2 text-sm text-white transition duration-150 ease-in hover:bg-gray-700 focus:outline-none sm:text-base"
                >
                  <ArrowCircleLeftIcon className="h-6 w-6" />
                  <span className="ml-2 uppercase">Back to home</span>
                </button>
              </Link>
              <button
                type="submit"
                disabled={isLoginStarted}
                className="ml-2 flex w-full items-center justify-center rounded bg-blue-600 py-2 text-sm text-white transition duration-150 ease-in hover:bg-blue-700 focus:outline-none sm:text-base"
              >
                <span className="mr-2 uppercase">Login</span>
                <ArrowCircleRightIcon className="h-6 w-6" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
