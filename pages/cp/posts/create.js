import Editor from '../../../components/Editor';
import { AuthMiddleware } from '../../../middleware/auth';

function PostsCreate() {
    return ( <Editor post={{}} /> )
}

export default AuthMiddleware(PostsCreate);
