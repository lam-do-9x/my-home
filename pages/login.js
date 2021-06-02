import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client'
import Main from '../components/Main';
import Login from '../components/Login';

export default function login() {
    const router = useRouter();
    const [redirectTo, setRedirectTo] = useState('/cp/posts');
    const [session, loading] = useSession()

    useEffect(async () => {
        if (!router.isReady) return;
        const { redirect } = router.query;
        if (redirect) {
            setRedirectTo(redirect);
        }
    }, [router.isReady]);

    if (loading && session) {
        router.push(redirectTo);
    }

    return (
        <Main>
            <Login redirectTo={redirectTo}/>
        </Main>
    )
}
