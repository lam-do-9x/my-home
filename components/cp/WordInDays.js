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
      <div className="bg-white rounded shadow-lg">
        <div className="flex p-1">
          {wordInWeek.map((word) => (
            <div key={word.dateMonth} className="mx-2 text-center">
              <h3 className="font-bold">{word.dateMonth}</h3>
              {word.data.map((w) => (
                <p
                  key={w.word}
                  className="cursor-pointer hover:bg-gray-200 rounded-lg"
                >
                  {w.word}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
