import { useEffect, useState } from 'react'
import {
  PencilIcon,
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import Loader from './Loader'
import Paginate from './Paginate'

export default function WordLearn(props) {
  const [isLoading, setLoading] = useState(true)
  const [pageCount, setPageCount] = useState(0)
  const [offset, setOffset] = useState(0)
  const [time, setTime] = useState(7)
  const [dictionaries, setDictionaries] = useState([])

  useEffect(() => {
    fetchRandom()
    setLoading(false)
  }, [offset, time])

  async function fetchRandom() {
    const { dictionaries, pageCount } = await fetch(
      `/api/dictionaries?page=yg&take=5&skip=${offset}&time=${time}`
    ).then((res) => res.json())

    setDictionaries(dictionaries)

    setPageCount(pageCount > 1 ? pageCount : 0)

    return dictionaries
  }

  return (
    <div className="mr-4 w-1/3">
      <div className="mb-2 flex justify-end">
        <select
          className="rounded-l border py-2 px-4 focus:outline-none"
          onChange={(e) => setTime(e.target.value)}
        >
          <option value={7}>Week</option>
          <option value={30}>Month</option>
          <option value={365}>Year</option>
          <option>All</option>
        </select>
      </div>
      <table className="h-fit w-full table-auto rounded shadow-md">
        <thead>
          <tr className="bg-gray-200 text-center text-sm uppercase leading-normal text-gray-600">
            <th className="py-3 px-6 text-left">word</th>
            <th className="py-3 px-6 text-center">ipa</th>
            <th className="flex justify-center py-3 px-6">
              <AdjustmentsVerticalIcon className="h-6 w-6" />
            </th>
          </tr>
        </thead>
        <tbody className="text-sm font-light text-gray-600">
          {isLoading ? (
            <tr className="border-b border-gray-200">
              <td colSpan="3">
                <Loader />
              </td>
            </tr>
          ) : (
            dictionaries.map((dictionary) => (
              <tr
                className="border-b border-gray-200 hover:bg-gray-100"
                key={dictionary.id}
              >
                <td
                  className="my-4 flex cursor-pointer py-3 px-6"
                  onClick={() => props.onView(dictionary.id)}
                >
                  <span className="font-medium">{dictionary.word}</span>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="text-bold flex items-center justify-center">
                    {dictionary.ipa}
                  </div>
                </td>
                <td className="py-3 px-6">
                  <div className="item-center flex justify-center">
                    <div
                      className="mr-2 w-4 transform cursor-pointer hover:scale-110 hover:text-yellow-500"
                      onClick={() => props.onSearch(dictionary.word)}
                    >
                      <MagnifyingGlassIcon className="h-5 w-5" />
                    </div>
                    <div
                      className="mr-2 w-4 transform cursor-pointer hover:scale-110 hover:text-yellow-500"
                      onClick={() => props.onEdit(dictionary.id)}
                    >
                      <PencilIcon className="h-5 w-5" />
                    </div>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Paginate
        perPage={3}
        pageCount={pageCount}
        handlePageClick={(offset) => setOffset(offset)}
      />
    </div>
  )
}
