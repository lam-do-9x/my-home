import { useState, useEffect, useRef } from 'react'
import {
  AdjustmentsIcon,
  PencilAltIcon,
  PencilIcon,
} from '@heroicons/react/outline'
import { SearchIcon } from '@heroicons/react/solid'
import { CpLayout } from '@components/Layout'
import Header from '@components/Header'
import UpSetImpov from '@components/cp/UpSetImpov'
import MDRender from '@components/cp/MDR'
import RandomWord from '@components/cp/RandomWord'
import { debounce } from '@lib/helper'
import Loader from '@components/cp/Loader'
import Modal from '@components/cp/ImprovModal'
import Paginate from '@components/cp/Paginate'

export default function Improvisation() {
  const [isLoading, setLoading] = useState(true)
  const [pageCount, setPageCount] = useState(0)
  const [offset, setOffset] = useState(0)
  const [isUpSet, setUpSet] = useState(false)
  const [isShow, setShow] = useState(false)
  const [improvisations, setImprovisations] = useState([])
  const [improvisation, setImprovisation] = useState({})
  const [keyword, setKeyword] = useState('')

  useEffect(async () => {
    await fetchImprovisations()
    setLoading(false)
  }, [offset])

  async function close(improvisation) {
    if (Object.keys(improvisation).length !== 0) {
      const index = improvisations.findIndex((i) => i.id === improvisation.id)

      improvisations[index] = improvisation

      setImprovisations(improvisations)
    } else {
      await fetchImprovisations()
    }

    setUpSet(false)
  }

  async function fetchImprovisations(word) {
    let url = `/api/improvisations?take=5&skip=${offset}`

    if (word || keyword !== '') {
      url = `${url}&q=${word || keyword}`
    }

    const { improvisations, pageCount } = await fetch(url).then((res) =>
      res.json()
    )

    setPageCount(pageCount > 1 ? pageCount : 0)

    setImprovisations(improvisations)
  }

  async function fetchImprovByQuery(word) {
    await fetchImprovisations(word)
    setLoading(false)
  }

  const debounceDropDown = useRef(
    debounce((nextValue) => fetchImprovByQuery(nextValue), 1000)
  ).current

  function search(e) {
    setLoading(true)
    setPageCount(0)
    setOffset(0)
    const { value } = e.target
    setKeyword(value)
    debounceDropDown(value)
  }

  function create() {
    setImprovisation({})
    setUpSet(true)
  }

  function edit(id) {
    const improvisation = improvisations.find((i) => i.id === id)
    setImprovisation(improvisation)
    setUpSet(true)
  }

  async function show(id) {
    const improvisation = improvisations.find((i) => i.id === id)
    setImprovisation(improvisation)
    setShow(true)
  }

  return (
    <CpLayout>
      <Header title="Improvisation" />
      <div className="mx-6 mt-6 flex">
        <h2 className="font-large mr-4 flex max-w-fit rounded border p-2 text-lg uppercase">
          Improvisation
        </h2>
      </div>
      <div className="w-full">
        <div className="mx-6 flex">
          <RandomWord />
          <div className="w-2/3">
            <div className="my-2 flex justify-between">
              <div
                className="cursor-pointer rounded-md border p-2 shadow hover:bg-gray-100"
                onClick={create}
              >
                <PencilAltIcon className="h-5 w-5" />
              </div>
              <label className="relative block">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <SearchIcon className="h-5 w-5 fill-gray-300" />
                </span>
                <input
                  className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-9 pr-3 shadow-sm placeholder:italic placeholder:text-gray-400 focus:outline-none sm:text-sm"
                  placeholder="Search for content..."
                  type="text"
                  name="search"
                  value={keyword}
                  onChange={search}
                />
              </label>
            </div>
            <table className="w-full min-w-min table-auto">
              <thead>
                <tr className="bg-gray-200 text-center text-sm uppercase leading-normal text-gray-600">
                  <th className="py-3 px-6 text-center">content</th>
                  <th className="flex justify-center py-3 px-6">
                    <AdjustmentsIcon className="h-6 w-6" />
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm font-light text-gray-600">
                {isLoading ? (
                  <tr className="border-b border-gray-200">
                    <td colSpan="2">
                      <Loader />
                    </td>
                  </tr>
                ) : (
                  improvisations.map((improvisation) => (
                    <tr
                      className="border-b border-gray-200 hover:bg-gray-100"
                      key={improvisation.id}
                    >
                      <td
                        className="my-4 flex cursor-pointer py-3 px-6 font-medium"
                        onClick={() => show(improvisation.id)}
                      >
                        <MDRender
                          content={improvisation.display}
                          className={'h-5 overflow-hidden'}
                        />
                      </td>
                      <td className="py-3 px-6">
                        <div
                          className="flex transform cursor-pointer justify-center hover:scale-110 hover:text-yellow-500"
                          onClick={() => edit(improvisation.id)}
                        >
                          <PencilIcon className="h-5 w-5" />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <Paginate
              perPage={5}
              pageCount={pageCount}
              handlePageClick={(offset) => setOffset(offset)}
            />
          </div>
          {isShow && (
            <Modal
              improvisation={improvisation}
              onClick={() => setShow(false)}
            />
          )}
          {isUpSet && (
            <UpSetImpov
              improvisation={improvisation}
              onClick={(improvisation) => close(improvisation)}
            />
          )}
        </div>
      </div>
    </CpLayout>
  )
}
