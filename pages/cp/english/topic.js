import { useEffect, useState } from 'react'
import {
  AdjustmentsVerticalIcon,
  PlusIcon,
  PencilIcon,
} from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { CpLayout } from '@components/Layout'
import Header from '@components/Header'
import Loader from '@components/cp/Loader'
import Paginate from '@components/cp/Paginate'
import InsertTopic from '@components/cp/InsertTopic'
import TopicModal from '@components/cp/TopicModal'

export default function Topic() {
    const [isLoading, setLoading] = useState(true)
    const [offset, setOffset] = useState(0)
    const [pageCount, setPageCount] = useState(0)
    const [topics, setTopics] = useState([])
    const [topic, setTopic] = useState({})
    const [isUpSet, setUpSet] = useState(false)
    const [isDetail, setDetail] = useState(false)

    useEffect(async () => {
        await fetchTopics()
        setLoading(false)
    }, [offset])

    async function fetchTopics() {
        let url = `/api/topics?take=10&skip=${offset}`

        const { topics, pageCount } = await fetch(url).then((response) => response.json())

        setPageCount(pageCount > 1 ? pageCount : 0)

        setTopics(topics)
    }

    async function close(topic) {
        if (Object.keys(topic).length > 0) {
            await fetchTopics()
        }

        setUpSet(false);
    }

    function handleOpenDetail(topic) {
        setTopic(topic);
        setDetail(true);
    }

  return (
    <CpLayout>
      <Header title="Topic" />
      <div className="mx-6 mt-6 flex items-center">
        <h2 className="font-large mr-4 flex max-w-min rounded border p-2 text-lg uppercase">
          Topic
        </h2>
        <div className="cursor-pointer rounded-md border p-3 shadow hover:bg-gray-100" onClick={() => setUpSet(true)}>
          <PlusIcon className="h-5 w-5" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="flex items-center justify-center overflow-hidden font-sans shadow">
          <div className="mx-6 mb-6 w-full">
            <div className="mb-2 flex justify-end">
              <label className="relative block">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <MagnifyingGlassIcon className="h-5 w-5 fill-gray-300" />
                </span>
                <input
                  className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-9 pr-3 shadow-sm placeholder:italic placeholder:text-gray-400 focus:outline-none sm:text-sm"
                  placeholder="Search for topic..."
                  type="text"
                  name="search"
                />
              </label>
            </div>
            <table className="w-full min-w-max table-auto rounded shadow-md">
              <thead>
                <tr className="bg-gray-200 text-center text-sm uppercase leading-normal text-gray-600">
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Content</th>
                  <th className="flex justify-center py-3 px-6">
                    <AdjustmentsVerticalIcon className="h-6 w-6" />
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm font-light text-gray-600">
                {isLoading ? (
                  <tr className="border-b border-gray-200">
                    <td colSpan="4">
                      <Loader />
                    </td>
                  </tr>
                ) : (
                  topics?.map((topic) => (
                    <tr
                      className="border-b border-gray-200 hover:bg-gray-100"
                      key={topic.id}
                    >
                      <td className="my-4 flex cursor-pointer py-3 px-6" onClick={() => handleOpenDetail(topic)}>
                        <span className="font-medium">{topic.name}</span>
                      </td>
                      <td className="py-3 px-6">
                        {topic?.content?.length > 50 ? `${topic.content.slice(0, 50)}...` : topic.content}
                      </td>
                      <td className="py-3 px-6">
                        <div className="item-center flex justify-center">
                          <div className="mr-2 w-4 transform cursor-pointer hover:scale-110 hover:text-yellow-500">
                            <PencilIcon className="h-5 w-5" />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {isUpSet && (
              <InsertTopic topic={topic} onClick={(topic) => close(topic)}/>
            )}
             {isDetail && (
              <TopicModal topic={topic} onClick={() => setDetail(false)}/>
            )}
            <Paginate
              perPage={10}
              pageCount={pageCount}
              handlePageClick={(offset) => setOffset(offset)}
            />
          </div>
        </div>
      </div>
    </CpLayout>
  )
}
