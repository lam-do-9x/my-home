import {
  PresentationChartLineIcon,
  CheckCircleIcon,
  QuestionMarkCircleIcon,
  RefreshIcon,
} from "@heroicons/react/outline";

export default function BodyLanguageTrainingFinish(props) {
  function correctAnswer(results) {
    return results.reduce((total, result) => {
      return result.correct ? total + 1 : total;
    }, 0);
  }

  return (
    <div
      className={`my-10 flex flex-col items-center justify-center ${
        props.hide ? "hidden" : "block"
      }`}
    >
      <p className="my-2 text-center text-xl font-bold">Results</p>
      <PresentationChartLineIcon className="my-4 h-10 w-10" />
      <div className="mb-10 flex">
        <div className="mx-1 flex">
          <p>{correctAnswer(props.results)}</p>
          <CheckCircleIcon className="ml-1 h-6 w-6" />
        </div>
        <p>/</p>
        <div className="mx-1 flex">
          <p>{props.results.length} </p>
          <QuestionMarkCircleIcon className="ml-1 h-6 w-6" />
        </div>
      </div>
      <a href="/cp/communication/body-language/training">
        <RefreshIcon className="h-8 w-8 cursor-pointer" />
      </a>
    </div>
  );
}
