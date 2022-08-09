import { useState, useEffect } from 'react'
import { RefreshIcon, CalendarIcon } from '@heroicons/react/outline'
import { formatDate } from '@lib/dateTime'
import { CpLayout } from '@components/Layout'
import Header from '@components/Header'
import WordLearn from '@components/cp/WordLearn'
import Modal from '@components/cp/Modal'
import UpSetModal from '@components/cp/UpSetModal'

export default function Youglish() {
  const [dictionaries, setDictionaries] = useState([])
  const [dictionary, setDictionary] = useState({})
  const [show, setShow] = useState(false)
  const [isUpSet, setUpSet] = useState(false)

  function fetchYg(word) {
    /* eslint-disable no-undef */
    YG.Widget('yg-widget', {
      width: 880,
    }).fetch(word, 'english')
  }

  function changeYg() {
    const index = Math.floor(Math.random() * dictionaries.length)
    fetchYg(dictionaries[index].word)
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      let script = document.createElement('script')
      script.src = src
      script.onload = () => resolve(script)
      script.onerror = () => reject(new Error(`Script load error for ${src}`))

      document.head.append(script)
    })
  }

  useEffect(async () => {
    const { dictionaries } = await fetch(`/api/dictionaries?page=yg`).then(
      (res) => res.json()
    )

    setDictionaries(dictionaries)

    loadScript('https://youglish.com/public/emb/widget.js').then(() =>
      fetchYg(dictionaries[0].word)
    )
  }, [])

  function setView(id) {
    YG.Widget('yg-widget').pause()

    const dictionary = dictionaries.find((d) => d.id === id)
    setDictionary(dictionary)
    setShow(true)
  }

  function setEdit(id) {
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
      <Header title="Youglish" />
      <div className="flex p-6">
        <h2 className="font-large flex max-w-min rounded border p-2 text-lg uppercase">
          Youglish
        </h2>
        <div className="mx-2 flex items-center justify-center">
          <RefreshIcon className="mx-1 h-5 w-5" onClick={changeYg} />
        </div>
        <a
          className="mx-2 flex items-center justify-center rounded bg-gray-100 p-2 text-center font-bold text-gray-500 hover:bg-gray-200"
          href={`https://youglish.com/lesson/video/${formatDate('dd-mm-yyyy')}`}
          target="_blank"
          rel="noreferrer"
        >
          <CalendarIcon className="mr-2 h-5 w-5" />
          Daily Lesson
        </a>
      </div>
      <div className="flex w-full px-6">
        <WordLearn
          onView={(id) => setView(id)}
          onEdit={(id) => setEdit(id)}
          onSearch={(word) => fetchYg(word)}
        />
        <div id="yg-widget"></div>
      </div>
      {show && <Modal dictionary={dictionary} onClick={() => setShow(false)} />}
      {isUpSet && (
        <UpSetModal
          dictionary={dictionary}
          onClick={(dictionary) => close(dictionary)}
        />
      )}
    </CpLayout>
  )
}
