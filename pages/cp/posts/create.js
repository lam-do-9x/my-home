import Editor from '../../../components/Editor';
import { WithAuthSync } from '../../../middleware/auth';

function PostsCreate() {
    return ( <Editor post={{}} /> )
}

export default WithAuthSync(PostsCreate);
