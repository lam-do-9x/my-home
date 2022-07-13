import { useState, useEffect } from "react";
import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
  ArchiveIcon,
} from "@heroicons/react/outline";
import { getRandomAnswers, shuffle } from "../../lib/randomWord";
import Loader from "./Loader";
import MediaDisplay from "./MediaDisplay";
import fetchClient from "../../lib/fetchClient";

export default function BodyLanguageTrainingQA(props) {
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(1);
  const [answers, setAnswers] = useState([]);
  const [listAnswer, setListAnswer] = useState([]);

  function handleAnswers(options, correctAnswer) {
    const uniqueAnswer = getRandomAnswers(options, correctAnswer);
    return shuffle([...uniqueAnswer, correctAnswer]);
  }

  useEffect(async () => {
    const { questions } = await fetch(
      "/api/body-language?take=10&page=training"
    ).then((res) => res.json());

    setQuestions(questions);

    const options = await fetch("/api/body-language/selected").then((res) =>
      res.json()
    );

    const answers = questions.map((question) => {
      return handleAnswers(
        options.bodyLanguageEmotionSelectedOptions,
        question?.emotions[0].selected
      );
    });
    setAnswers(answers);
  }, []);

  async function showResults() {
    const qa = questions.map((question, index) => {
      return {
        question: question.id,
        answer: listAnswer[index] ?? "",
        examDate: new Date(),
        correct: question?.emotions[0].selected.value === listAnswer[index],
      };
    });

    await fetchClient(
      `/api/body-language/training`,
      JSON.stringify(qa),
      "POST"
    );
  }

  function onChangeRadioInput(input, index) {
    listAnswer[index] = input.currentTarget.value;
    setListAnswer(listAnswer);
  }

  return (
    <div
      className={`my-10 flex flex-col items-center justify-center ${
        props.hide ? "hidden" : "block"
      }`}
    >
      {props.hide ? (
        <div className="flex h-full items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div>
          <p className="text-center text-2xl">{`${questionIndex}/${questions.length}`}</p>
          {questions.map((question, index) => (
            <section
              className={`my-4 flex w-full ${
                questionIndex === index + 1 ? "block" : "hidden"
              }`}
              key={question.id}
            >
              <div className="mx-4 w-1/2" key={question.media}>
                <MediaDisplay media={question.media} />
              </div>
              <div className="flex w-1/2 flex-col justify-center">
                {answers[index].map((answer, id) => (
                  <div
                    className="mx-4 my-2 flex "
                    key={`answer-${answer.value}-${id}`}
                  >
                    <input
                      type="radio"
                      key={`option-${answer.id}`}
                      value={answer.value}
                      name={`answer-for-question-${question.id}`}
                      onChange={(input) => onChangeRadioInput(input, index)}
                    />
                    <label className="mx-2">{answer.label}</label>
                  </div>
                ))}
              </div>
            </section>
          ))}
          <section className="flex items-center justify-center">
            {questionIndex > 1 && (
              <div
                className="mx-2 my-2 cursor-pointer"
                onClick={() => setQuestionIndex(questionIndex - 1)}
              >
                <ArrowCircleLeftIcon className="h-10 w-10" />
              </div>
            )}
            {questionIndex < questions.length && (
              <div
                className="mx-2 my-2 cursor-pointer"
                onClick={() => setQuestionIndex(questionIndex + 1)}
              >
                <ArrowCircleRightIcon className="h-10 w-10" />
              </div>
            )}
            {questionIndex === questions.length && (
              <div className="mx-2 my-2 cursor-pointer" onClick={showResults}>
                <ArchiveIcon className="h-10 w-10" />
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
