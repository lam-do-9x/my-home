import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import Editor from '../../../components/Editor';
import { AuthMiddleware } from '../../../middleware/auth';

function PostID() {
    const router = useRouter();
    const [post, setPost] = useState({});

    useEffect(async () => {
        if (!router.isReady) return;
        const postId = router.query.id;
        const res = await fetch(`/api/posts/${postId}`);
        const { post } = await res.json();
        setPost(post);
    }, [router.isReady]);

    return ( Object.keys(post).length !== 0 && <Editor post={post} /> );
}

export default AuthMiddleware(PostID);
