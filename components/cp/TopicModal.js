import { useEffect, useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Loader from '@components/cp/Loader'

export default function TopicModal(props) {
  const [sentences, setSentence] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(async () => {
         const url = `/api/topics/${props.topic.id}/sentences`

        const { sentences } = await fetch(url).then((response) => response.json())

        setSentence(sentences)

        setLoading(false)
    }, [])

    function close() {
        props.onClick()
    }

  return (
    <div className="absolute inset-0 h-screen w-full bg-black bg-opacity-30">
      <div className="fixed left-0 top-0 z-50 flex h-full w-full opacity-100 transition-opacity duration-300">
        <div className="m-20 w-full overflow-y-hidden overflow-y-scroll rounded-lg border bg-white shadow">
          <div className="mx-20 flex items-center justify-between border-b py-6 text-3xl font-bold uppercase">
              {props.topic.name}
            <XMarkIcon
              className="h-5 w-5 cursor-pointer"
              onClick={close}
            />
          </div>
          <div className="px-20">
            <div className="my-2 mr-2 w-full">
                <p className="text-xl font-bold">Content</p>
                <p className="break-words">{props.topic.content}</p>
            </div>
            <div className='my-2'>
                <p className="text-xl font-bold">Sentences</p>
                <ul className="flex flex-wrap">
                  {isLoading ? (
                    <div className="border-b border-gray-200">
                        <div colSpan="4">
                        <Loader />
                        </div>
                    </div>
                    ) : (
                        sentences?.map((sentence) => (
                            <li className="my-2 mr-2 border p-2">
                                {sentence.sentence.title}
                            </li>
                        ))
                    )}
                </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
