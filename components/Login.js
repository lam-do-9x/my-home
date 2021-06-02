import { useState, useEffect } from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/client';
import Notification from "./Notification";

export default function Login({ redirectTo }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginStarted, setIsLoginStarted] = useState(false);
    const [loginError, setLoginError] = useState({});
    const router = useRouter();

    useEffect(() => {
        const error = router.query.error;
        if (error) {
            setEmail(router.query.email);
            const message = error.split('Error:')[1];
            const loginErrorObject = {message, code: 401};
            setLoginError(loginErrorObject);
            setTimeout(() => {
                setLoginError({});
            }, 3000);
        }
    }, [router])

    async function handleLogin(e) {
        e.preventDefault();
        setIsLoginStarted(true)
        await signIn('credentials',
            { email, password, callbackUrl: `${window.location.origin}${redirectTo}`}
        )
    }

    return (
        <div className="h-screen flex flex-col items-center justify-center">
            {Object.keys(loginError).length !== 0 && <Notification response={loginError} />}
            <div className="flex flex-col bg-white border shadow px-4 py-8 rounded-md w-full max-w-md">
                <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">Login To Admin</div>
                <div className="mt-10">
                    <form onSubmit={(e) => handleLogin(e)}>
                        <div className="flex flex-col mb-6">
                            <label htmlFor="email" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Email:</label>
                            <div className="relative">
                                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                    <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>
                                <input onChange={e => setEmail(e.target.value)} type="text" name="email" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Email Address" value={email || ''}/>
                            </div>
                        </div>
                        <div className="flex flex-col mb-6">
                            <label htmlFor="password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Password:</label>
                            <div className="relative">
                                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                    <span>
                                        <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </span>
                                </div>
                                <input onChange={e => setPassword(e.target.value)} type="password" name="password" className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Password" />
                            </div>
                        </div>
                        <div className="flex w-full">
                            <Link href='/'>
                                <button type="button" className="mr-2 flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-gray-600 hover:bg-gray-700 rounded py-2 w-full transition duration-150 ease-in">
                                    <span>
                                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                                        </svg>
                                    </span>
                                    <span className="ml-2 uppercase">Back to home</span>
                                </button>
                            </Link>
                            <button type='submit' disabled={isLoginStarted} className="ml-2 flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in">
                                <span className="mr-2 uppercase">Login</span>
                                <span>
                                    <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
