const colorByEmotion = {
  surprise: "bg-yellow-200",
  anger: "bg-red-200",
  sadness: "bg-blue-200",
  fear: "bg-purple-200",
  happiness: "bg-green-200",
  disgust: "bg-yellow-700",
  contempt: "bg-pink-200",
};

function getColor(emotion) {
  return colorByEmotion[emotion];
}

export { getColor };
