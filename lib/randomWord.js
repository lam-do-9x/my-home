const random = require("../public/random.json");

function randInt(max, min = 0) {
  const range = max - min + 1;
  return Math.floor(Math.random() * range) + min;
}

export function generateRandomWord() {
  const randomWords = random.words;
  return randomWords[randInt(randomWords.length)];
}

export const getRandomIds = (maxId, take) => {
  let rightSize = false;
  let randomIds = [];

  while (!rightSize) {
    const id = randInt(maxId, 1);
    if (!randomIds.includes(id)) {
      randomIds.push(id);
    }
    if (randomIds.length === take) {
      rightSize = true;
    }
  }

  return randomIds;
};

export const getRandomAnswers = (options, correctAnswer) => {
  let rightSize = false;
  let randomAnswers = [];

  while (!rightSize) {
    const id = randInt(options.length - 1);
    const existedInRandomAnswers = randomAnswers.find(
      (answer) => answer.value === options[id].value
    );
    if (options[id].value !== correctAnswer.value && !existedInRandomAnswers) {
      randomAnswers.push(options[id]);
    }
    if (randomAnswers.length === 3) {
      rightSize = true;
    }
  }

  return randomAnswers;
};

export function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
