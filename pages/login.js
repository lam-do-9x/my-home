import Main from '../components/Main';
import Login from '../components/Login';
import {useRouter} from 'next/router';
import { useState, useEffect} from 'react';

export default function login() {
    const router = useRouter();
    const [redirectTo, setRedirectTo] = useState('/cp/posts');

    useEffect(async () => {
        if (!router.isReady) return;
        const {redirect} = router.query;
        if (redirect) {
            setRedirectTo(redirect);
        }
    }, [router.isReady]);

    return (
        <Main>
            <Login redirectTo={redirectTo}/>
        </Main>
    )
}
