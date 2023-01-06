import { useEffect, useState } from 'react'
import CreatableSelect from 'react-select/creatable'
import { XCircleIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import fetchClient from '../../lib/fetchClient'
import uploadToCloudinary from '../../lib/uploadToCloudinary'

export default function InsertBodyLanguage(props) {
  const [options, setOptions] = useState([])
  const [emotions, setEmotion] = useState([])
  const [types, setTypes] = useState([])
  const [media, setMedia] = useState([])

  useEffect(async () => {
    const options = await fetch('/api/body-language/selected').then((res) =>
      res.json()
    )
    setOptions(options)
  }, [])

  function close(fashion) {
    setEmotion([])
    setTypes([])
    props.onClick(fashion)
  }

  function handleFileSelected(e) {
    setMedia(e.target.files)
  }

  async function submit() {
    const uploadResponse = await uploadToCloudinary(
      process.env.NEXT_PUBLIC_BODY_LANGUAGE_UPLOAD_PRESET,
      media[0]
    )
    const body = JSON.stringify({
      media: uploadResponse.secure_url,
      emotions,
      types,
    })

    const bodyLanguage = await fetchClient('/api/body-language', body)

    close(bodyLanguage)
  }

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center p-7 opacity-100 transition-opacity duration-300">
      <div className="mx-auto w-3/4 max-w-xl rounded-xl border bg-white p-5 shadow-lg">
        <div className="rounded-md">
          <div className="mb-4 flex w-full">
            <p className="mb-2 mr-2 text-xl font-semibold">Media</p>
            <input
              type="file"
              className="block w-full text-sm text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-slate-50 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-slate-700 hover:file:bg-slate-100"
              onChange={handleFileSelected}
            />
          </div>
          <div className="mb-4 w-full">
            <p className="mb-2 text-xl font-semibold">Emotion</p>
            <CreatableSelect
              options={options.bodyLanguageEmotionSelectedOptions}
              onChange={(clothe) => setEmotion(clothe)}
            />
          </div>
          <div className="mb-4 w-full">
            <p className="mb-2 text-xl font-semibold">Type</p>
            <CreatableSelect
              options={options.bodyLanguageTypesSelectedOptions}
              isMulti={true}
              onChange={(type) => setTypes(type)}
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
