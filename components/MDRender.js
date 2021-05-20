import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

const components = {
    h1({ children }) {
      return <h1 className='text-center'>{children}</h1>
    },
    a({ children, ...props }) {
        return <a href={`${props.href}`} target="_blank">{children}</a>
    }
}

export default function MDRender({content}) {
    return <ReactMarkdown children={content} remarkPlugins={[gfm]} components={components}/>
}
