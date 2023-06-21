import { useState } from 'react'
import { XCircleIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import MDE from './MDE'
import fetchClient from '../../lib/fetchClient'

export default function InsertSentence(props) {
  const [title, setTitle] = useState(props?.sentence?.title)
  const [content, setContent] = useState(props?.sentence?.content)

  function close(sentence) {
    setTitle('')
    setContent('')
    props.onClick(sentence)
  }

  async function submit(e) {
    e.target.disabled = true;

    if (title !== '') {
        const body = JSON.stringify({title, content})

        let response = {}

        if (Object.keys(props.sentence).length !== 0) {
            response = await fetchClient(`/api/sentences/${props.sentence.id}`, body, 'PATCH')
        } else {
            response = await fetchClient('/api/sentences', body)
        }

        close(response.sentence)
    }
  }

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center p-7 opacity-100 transition-opacity duration-300">
      <div className="mx-auto w-3/4 max-w-xl rounded-xl border bg-white p-5 shadow-lg">
        <div className="rounded-md">
          <div className="mb-4 w-full">
            <p className="mb-2 mr-2 text-xl font-semibold">Title</p>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4 w-full">
            <p className="mb-2 text-xl font-semibold">Content</p>
            <MDE
              content={content}
              onChange={(content) => setContent(content)}
            />
          </div>
          <div className="flex justify-end">
            <button className="mx-2 rounded-full border p-3" onClick={submit}>
              <ArrowDownTrayIcon className="h-5 w-5" />
            </button>
            <button
              className="mx-2 rounded-full border p-3"
              onClick={() => close({})}
            >
              <XCircleIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
