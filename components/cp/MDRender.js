import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

const components = {
    h1({ children }) {
      return <h1 className='text-center'>{children}</h1>
    },
    a({ node, children, ...props }) {
        if (node.children[0].tagName === 'img') {
            return  <iframe height="500" src={`${props.href}`} className="my-4 w-full"></iframe>
        }
        return <a href={`${props.href}`} target="_blank" rel="noreferrer">{children}</a>
    }
}

export default function MDRender({content}) {
    return <ReactMarkdown children={content} remarkPlugins={[gfm]} components={components}/>
}
