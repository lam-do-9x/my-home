import { monthDate } from "../../lib/dateTime";

const transformBlogByDate = (words) => {
  return words.reduce((transform, word) => {
    let dateMonth = monthDate(new Date(word.contentAt));

    const isExist = transform.find((w) => w.dateMonth === dateMonth);

    if (!isExist) {
      transform.push({ dateMonth, data: [word] });
    } else {
      isExist["data"].push(word);
    }

    return transform;
  }, []);
};

export default function WordInDays({ words }) {
  const wordInWeek = transformBlogByDate(words);
  console.log(wordInWeek);
  return (
    <div
      className={`flex items-center fixed right-0 top-0 ${
        words.length !== 0 ? "" : "hidden"
      }`}
    >
      <div className={`bg-white rounded flex items-start shadow-lg`}>
        <div className="flex space-x-2 p-2">
          <div className="flex">
            {wordInWeek.map((word) => (
              <div key={word.dateMonth} className="mx-2 text-center">
                <h3 className="font-bold">{word.dateMonth}</h3>
                {word.data.map((w) => (
                  <p key={w.word} className="cursor-pointer">
                    {w.word}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
