import { useEffect, useState } from 'react'
import Image from 'next/image'
import Select from 'react-select'
import { PencilAltIcon, RefreshIcon } from '@heroicons/react/outline'
import Layout from '@components/cp/Layout'
import ReceiptModal from '@components/cp/ReceiptModal'
import { AuthMiddleware } from '../../../middleware/auth'
import Loader from '@components/cp/Loader'
import Paginate from '@components/cp/Paginate'
import InsertReceipt from '@components/cp/InsertReceipt'

function Receipts() {
  const [modal, setModal] = useState(false)
  const [upset, setUpSet] = useState(false)
  const [receipt, setReceipt] = useState({})
  const [receipts, setReceipts] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [pageCount, setPageCount] = useState(0)
  const [offset, setOffset] = useState(0)
  const [options, setOptions] = useState([])
  const [selected, setSelected] = useState('')
  const [selectIngredients, setSelectIngredients] = useState(null)
  const [selectSessions, setSelectSessions] = useState(null)
  const [suggestSession, setSuggestSession] = useState(null)

  function openPage(receipt) {
    setReceipt(receipt)
    setModal(true)
  }

  async function getReceipts(selecting) {
    let url = `/api/receipts?take=8&skip=${offset}`

    if (selecting || selected !== '') {
      url = `${url}${selecting || selected}`
    }

    return await fetch(url).then((res) => res.json())
  }

  useEffect(async () => {
    const { receipts, pageCount } = await getReceipts()
    setReceipts(receipts)
    setPageCount(pageCount > 1 ? pageCount : 0)
    setLoading(false)
    const options = await fetch('/api/receipts/selected').then((res) =>
      res.json()
    )
    setOptions(options)
  }, [offset])

  async function handleInsert(receipt) {
    if (Object.keys(receipt).length > 0) {
      const { receipts, pageCount } = await getReceipts()
      setReceipts(receipts)
      setPageCount(pageCount > 1 ? pageCount : 0)
    }
    setUpSet(false)
  }

  async function handleOnChangeIngredient(selected) {
    setSelectSessions(null)
    setSelectIngredients(selected)
    const ingredientSelected = selected
      ?.map((select) => {
        return select.id
      })
      .join(',')

    const ingredientQuery = `&ingredients=${ingredientSelected}`

    const { receipts, pageCount } = await getReceipts(
      ingredientQuery !== '' ? ingredientQuery : 'undefined'
    )

    setPageCount(pageCount > 1 ? pageCount : 0)
    setReceipts(receipts)
    setSelected(ingredientQuery)
  }

  async function handleOnChangeSession(selected) {
    setSelectIngredients(null)
    setSelectSessions(selected)
    const sessionsSelected = selected
      ?.map((select) => {
        return select.id
      })
      .join(',')

    const sessionQuery = `&sessions=${sessionsSelected}`

    const { receipts, pageCount } = await getReceipts(
      sessionQuery !== '' ? sessionQuery : 'undefined'
    )

    setPageCount(pageCount > 1 ? pageCount : 0)
    setReceipts(receipts)
    setSelected(sessionQuery)
  }

  async function suggest() {
    const { receipt } = await fetch(`/api/receipts/${suggestSession}`).then(
      (res) => res.json()
    )
    setReceipt(receipt)
    setModal(true)
  }

  return (
    <Layout>
      <div className="mx-6 mt-6 h-full w-full">
        <div className="flex">
          <h2 className="font-large my-auto mr-4 flex max-w-min rounded border p-2 text-lg uppercase">
            Receipts
          </h2>
          <div
            className="my-auto mr-4 cursor-pointer rounded-md border p-3 shadow hover:bg-gray-100"
            onClick={() => setUpSet(true)}
          >
            <PencilAltIcon className="h-5 w-5" />
          </div>
          <div className="flex cursor-pointer items-center rounded-md border p-3 shadow">
            <Select
              options={options.receiptSessions}
              onChange={(selected) => setSuggestSession(selected.value)}
              instanceId
            />
            <RefreshIcon className="ml-2 h-5 w-5" onClick={suggest} />
          </div>
        </div>
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div className="overflow-hidden">
            <div className="flex border-b-2">
              <div className="mr-2 flex items-center justify-start py-2">
                <p className="mr-2">Ingredients:</p>
                <Select
                  options={options.receiptIngredients}
                  isMulti={true}
                  onChange={handleOnChangeIngredient}
                  value={selectIngredients}
                />
              </div>
              <div className="flex items-center justify-start py-2">
                <p className="mr-2">Sessions:</p>
                <Select
                  options={options.receiptSessions}
                  isMulti={true}
                  onChange={handleOnChangeSession}
                  value={selectSessions}
                />
              </div>
            </div>
            <div className="my-6 mr-6 grid grid-cols-4 gap-10">
              {receipts.map((receipt) => (
                <div
                  className="flex cursor-pointer flex-col rounded border border-gray-200 shadow-md"
                  key={receipt.id}
                  onClick={() => openPage(receipt)}
                >
                  <Image
                    className="object-fit"
                    src={
                      receipt.cover ??
                      '/ngo-thanh-tung-pCTuLkx8erE-unsplash.jpg'
                    }
                    width={300}
                    height={200}
                  />
                  <p className="my-2 px-2 text-center text-xl font-bold">
                    {receipt.name}
                  </p>
                  <div className="flex w-64 flex-wrap justify-center p-2">
                    {receipt.sessions?.map((session) => (
                      <div
                        key={session.selected.id}
                        className={`mx-2 mb-2 rounded border p-2`}
                      >
                        {session.selected.label}
                      </div>
                    ))}
                  </div>
                  <div className="flex w-64 flex-wrap justify-center p-2">
                    {receipt.methods?.map((method) => (
                      <div
                        key={method.selected.id}
                        className={`mx-2 mb-2 rounded border p-2`}
                      >
                        {method.selected.label}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {modal && (
                <ReceiptModal
                  receipt={receipt}
                  onClick={() => setModal(false)}
                />
              )}
              {upset && (
                <InsertReceipt onClick={(receipt) => handleInsert(receipt)} />
              )}
            </div>
            <div className="mb-6 flex items-center justify-center">
              <Paginate
                perPage={8}
                pageCount={pageCount}
                handlePageClick={(offset) => setOffset(offset)}
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default AuthMiddleware(Receipts)
