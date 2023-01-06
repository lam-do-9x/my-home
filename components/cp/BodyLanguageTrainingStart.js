import { useState } from 'react'
import { ArrowRightCircleIcon } from '@heroicons/react/24/outline'

export default function BodyLanguageTrainingStart(props) {
  const [hide, setHide] = useState(false)

  function nextStep() {
    setHide(true)
    props.onClick()
  }

  return (
    <div
      className={`my-10 flex flex-col items-center justify-center ${
        hide ? 'hidden' : 'block'
      }`}
    >
      <p className="my-2 text-center text-xl font-bold">
        Welcome to Body Language Training
      </p>
      <div className="my-2 cursor-pointer" onClick={nextStep}>
        <ArrowRightCircleIcon className="h-10 w-10" />
      </div>
    </div>
  )
}
