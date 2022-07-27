import { useEffect, useState, useRef } from 'react'
import {
  AdjustmentsIcon,
  PencilIcon,
  AnnotationIcon,
} from '@heroicons/react/outline'
import { SearchIcon, CheckIcon } from '@heroicons/react/solid'
import { CpLayout } from '@components/Layout'
import Header from '@components/Header'
import Loader from '@components/cp/Loader'
import Modal from '@components/cp/Modal'
import UpSetModal from '@components/cp/UpSetModal'
import { debounce } from '@lib/helper'
import fetchClient from '@lib/fetchClient'
import Paginate from '@components/cp/Paginate'

export default function Dictionary() {
  const [isLoading, setLoading] = useState(true)
  const [pageCount, setPageCount] = useState(0)
  const [offset, setOffset] = useState(0)
  const [dictionaries, setDictionaries] = useState([])
  const [dictionary, setDictionary] = useState({})
  const [isShow, setShow] = useState(false)
  const [isUpSet, setUpSet] = useState(false)
  const [keyword, setKeyword] = useState('')

  useEffect(async () => {
    await fetchDictionaries()
    setLoading(false)
  }, [offset])

  async function fetchDictionaries(word) {
    let url = `/api/dictionaries?take=10&skip=${offset}`

    if (word || keyword !== '') {
      url = `${url}&q=${word || keyword}`
    }

    const { dictionaries, pageCount } = await fetchClient(url)

    setPageCount(pageCount > 1 ? pageCount : 0)

    setDictionaries(dictionaries)
  }

  async function fetchDicByQuery(word) {
    await fetchDictionaries(word)
    setLoading(false)
  }

  const debounceDropDown = useRef(
    debounce((word) => fetchDicByQuery(word), 1000)
  ).current

  function search(e) {
    setLoading(true)
    setPageCount(0)
    setOffset(0)
    const { value } = e.target
    setKeyword(value)
    debounceDropDown(value)
  }

  function show(id) {
    const dictionary = dictionaries.find((d) => d.id === id)

    setDictionary(dictionary)

    setShow(true)
  }

  function edit(id) {
    const dictionary = dictionaries.find((d) => d.id === id)

    setDictionary(dictionary)

    setUpSet(true)
  }

  function close(dictionary) {
    if (Object.keys(dictionary).length !== 0) {
      const index = dictionaries.findIndex((d) => d.id === dictionary.id)

      dictionaries[index] = dictionary

      setDictionaries(dictionaries)
    }

    setUpSet(false)
  }

  return (
    <CpLayout>
      <Header title="Dictionary" />
      <div className="mx-6 mt-6 flex items-center">
        <h2 className="font-large mr-4 flex max-w-min rounded border p-2 text-lg uppercase">
          Dictionary
        </h2>
        <a
          className="flex items-center rounded bg-gray-100 p-2 text-center font-bold text-gray-500 hover:bg-gray-200"
          href="https://notevibes.com/cabinet.php"
          target="_blank"
          rel="noreferrer"
        >
          <AnnotationIcon className="mx-2 h-5 w-5" />
          Text to speech
        </a>
      </div>
      <div className="overflow-x-auto">
        <div className="flex items-center justify-center overflow-hidden font-sans shadow">
          <div className="mx-6 mb-6 w-full">
            <div className="mb-2 flex justify-end">
              <label className="relative block">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <SearchIcon className="h-5 w-5 fill-gray-300" />
                </span>
                <input
                  className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-9 pr-3 shadow-sm placeholder:italic placeholder:text-gray-400 focus:outline-none sm:text-sm"
                  placeholder="Search for word..."
                  type="text"
                  name="search"
                  onChange={search}
                  value={keyword}
                />
              </label>
            </div>
            <table className="w-full min-w-max table-auto rounded shadow-md">
              <thead>
                <tr className="bg-gray-200 text-center text-sm uppercase leading-normal text-gray-600">
                  <th className="py-3 px-6 text-left">word</th>
                  <th className="py-3 px-6 text-center">ipa</th>
                  <th className="py-3 px-6 text-center">pronunciation</th>
                  <th className="flex justify-center py-3 px-6">
                    <AdjustmentsIcon className="h-6 w-6" />
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
                  dictionaries.map((dictionary) => (
                    <tr
                      className="border-b border-gray-200 hover:bg-gray-100"
                      key={dictionary.id}
                    >
                      <td
                        className="my-4 flex cursor-pointer py-3 px-6"
                        onClick={() => show(dictionary.id)}
                      >
                        <span className="font-medium">{dictionary.word}</span>
                        {dictionary.content.length !== 0 && (
                          <CheckIcon className="h-5 w-5" />
                        )}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="text-bold flex items-center justify-center">
                          {dictionary.ipa}
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="item-center flex justify-center">
                          <audio id={dictionary.id} controls>
                            <source
                              src={`https://www.oxfordlearnersdictionaries.com${dictionary.pronunciation}`}
                              type="audio/mpeg"
                            ></source>
                          </audio>
                        </div>
                      </td>
                      <td className="py-3 px-6">
                        <div className="item-center flex justify-center">
                          <div
                            className="mr-2 w-4 transform cursor-pointer hover:scale-110 hover:text-yellow-500"
                            onClick={() => edit(dictionary.id)}
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
            {isShow && (
              <Modal dictionary={dictionary} onClick={() => setShow(false)} />
            )}
            {isUpSet && (
              <UpSetModal
                dictionary={dictionary}
                onClick={(dictionary) => close(dictionary)}
              />
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
