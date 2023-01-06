import { useState, useEffect } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { generateRandomWord } from '../../lib/randomWord'

export default function RandomWord() {
  const [randomWord, setRandomWord] = useState('')
  const [time, setTime] = useState(0)

  useEffect(() => {
    if (time <= 0) return

    const intervalId = setInterval(() => {
      setTime(time - 1)
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  })

  function getRandom() {
    const word = generateRandomWord()
    setRandomWord(word)
    setTime(60)
  }

  return (
    <div className="my-6 mr-4 w-1/3">
      <div className="my-8 flex h-fit flex-col items-center justify-center border p-4">
        <h3 className="my-2 border-b p-2 font-medium uppercase">
          Random Word Generator
        </h3>
        {randomWord.length !== 0 && (
          <p className="my-2 rounded border p-4" key={randomWord}>
            {randomWord}
          </p>
        )}
        {randomWord.length !== 0 && (
          <p>{time === 0 ? `countdown's over` : `${time} seconds remaining`}</p>
        )}
        <button
          className="my-2 flex items-center justify-center rounded-full border p-2 focus:outline-none"
          onClick={getRandom}
        >
          <PlusIcon className="h-5 w-5" />
          Generate
        </button>
      </div>
    </div>
  )
}
