import { useEffect, useState } from 'react'
import CreatableSelect from 'react-select/creatable'
import { XCircleIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import fetchClient from '../../lib/fetchClient'
import uploadToCloudinary from '../../lib/uploadToCloudinary'

export default function InsertReceipt(props) {
  const [options, setOptions] = useState([])
  const [ingredients, setIngredients] = useState([])
  const [sessions, setSessions] = useState([])
  const [methods, setMethods] = useState([])
  const [name, setName] = useState('')
  const [reference, setReference] = useState('')
  const [note, setNote] = useState('')
  const [cover, setCover] = useState([])

  useEffect(async () => {
    const options = await fetch('/api/receipts/select').then((res) =>
      res.json()
    )
    setOptions(options)
  }, [])

  function close(receipt) {
    setIngredients([])
    setSessions([])
    setMethods([])
    setName('')
    setReference('')
    setNote('')
    props.onClick(receipt)
  }

  function handleFileSelected(e) {
    setCover(e.target.files)
  }

  async function submit() {
    const uploadResponse = await uploadToCloudinary(
      process.env.NEXT_PUBLIC_RECEIPT_UPLOAD_PRESET,
      cover[0]
    )

    const body = JSON.stringify({
      cover: uploadResponse.secure_url,
      ingredients,
      sessions,
      methods,
      name,
      reference,
      note,
    })

    const receipt = await fetchClient('/api/receipts', body)

    close(receipt)
  }

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center p-7 opacity-100 transition-opacity duration-300">
      <div className="mx-auto w-3/4 max-w-xl rounded-xl border bg-white p-5 shadow-lg">
        <div className="rounded-md">
          <div className="mb-4 flex w-full">
            <p className="mb-2 mr-2 text-xl font-semibold">Cover</p>
            <input
              type="file"
              className="block w-full text-sm text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-slate-50 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-slate-700 hover:file:bg-slate-100"
              onChange={handleFileSelected}
            />
          </div>
          <div className="mb-4 w-full">
            <p className="mb-2 mr-2 text-xl font-semibold">Name</p>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4 w-full">
            <p className="mb-2 text-xl font-semibold">Ingredients</p>
            <CreatableSelect
              options={options.receiptIngredients}
              isMulti={true}
              onChange={(ingredient) => setIngredients(ingredient)}
            />
          </div>
          <div className="mb-4 w-full">
            <p className="mb-2 text-xl font-semibold">Sessions</p>
            <CreatableSelect
              options={options.receiptSessions}
              isMulti={true}
              onChange={(session) => setSessions(session)}
            />
          </div>
          <div className="mb-4 w-full">
            <p className="mb-2 text-xl font-semibold">Methods</p>
            <CreatableSelect
              options={options.receiptMethods}
              isMulti={true}
              onChange={(method) => setMethods(method)}
            />
          </div>
          <div className="mb-4 w-full">
            <p className="mb-2 mr-2 text-xl font-semibold">Reference</p>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm"
              onChange={(e) => setReference(e.target.value)}
            />
          </div>
          <div className="mb-4 w-full">
            <label
              htmlFor="message"
              className="mb-2 block text-xl font-semibold"
            >
              Note
            </label>
            <textarea
              id="message"
              rows="4"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Your notes..."
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
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
