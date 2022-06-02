const random = require("../public/random.json");

function randInt(lessThan) {
  return Math.floor(Math.random() * lessThan);
}

export function generateRandomWord() {
  const randomWords = random.words;
  return randomWords[randInt(randomWords.length)];
}
