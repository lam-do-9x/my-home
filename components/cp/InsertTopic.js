import { useEffect, useState } from 'react'
import { XCircleIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import MDE from './MDE'
import fetchClient from '../../lib/fetchClient'
import AsyncMultiSelect from '@components/AsyncMultiSelect'
import Loader from '@components/cp/Loader'

export default function InsertTopic(props) {
  const [name, setName] = useState(props?.topic?.name || '')
  const [content, setContent] = useState(props?.topic?.content || '')
  const [sentences, setSentences] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [dictionaries, setDictionaries] = useState([])
  const [isLoadingDictionary, setLoadingDictionary] = useState(true)

    async function getTopicDictionary(id) {
        const url = `/api/topics/${id}/dictionaries`

        const { dictionaries } = await fetch(url).then((response) => response.json())

        setDictionaries(dictionaries)

        setLoadingDictionary(false)
    }

    async function getTopicSentence(id) {
        const url = `/api/topics/${id}/sentences`

        const { sentences } = await fetch(url).then((response) => response.json())

        setSentences(sentences)

        setLoading(false)

    }

    useEffect(async () => {
        if (props?.topic?.id) {
            getTopicDictionary(props?.topic?.id)

            getTopicSentence(props?.topic?.id)

            return;
        }

        setLoading(false)

        setLoadingDictionary(false)
    }, [])

  function close(topic) {
    setName('')
    setContent('')
    setSentences([])
    props.onClick(topic)
  }

  async function submit(e) {
    e.target.disabled = true;

    if (name !== '') {
        const body = JSON.stringify({name, content, sentences, dictionaries})

        let response = {}

        if (Object.keys(props.topic).length !== 0) {
            response = await fetchClient(`/api/topics/${props.topic.id}`, body, 'PATCH')
        } else {
            response = await fetchClient('/api/topics', body)
        }

        close(response.topic)
    }
  }

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center p-7 opacity-100 transition-opacity duration-300">
      <div className="mx-auto w-3/4 max-w-xl rounded-xl border bg-white p-5 shadow-lg">
        <div className="rounded-md">
          <div className="mb-4 w-full">
            <p className="mb-2 mr-2 text-xl font-semibold">Name</p>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4 w-full">
            <p className="mb-2 text-xl font-semibold">Content</p>
            <MDE
              content={content}
              onChange={(content) => setContent(content)}
            />
          </div>
          <div className="mb-4 w-full">
            <p className="mb-2 text-xl font-semibold">Dictionaries</p>
            { isLoadingDictionary
                ?   (
                    <div className="border-gray-200">
                        <div colSpan="4">
                        <Loader />
                        </div>
                    </div>
                    )
                :   (<AsyncMultiSelect default={dictionaries} dictionary={true} onChange={(dictionaries) => setDictionaries(dictionaries)}/>)
            }
          </div>
          <div className="mb-4 w-full">
            <p className="mb-2 text-xl font-semibold">Sentences</p>
            { isLoading
                ?   (
                    <tr className="border-b border-gray-200">
                        <td colSpan="4">
                        <Loader />
                        </td>
                    </tr>
                    )
                :   (<AsyncMultiSelect default={sentences} onChange={(sentences) => setSentences(sentences)}/>)
            }
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
