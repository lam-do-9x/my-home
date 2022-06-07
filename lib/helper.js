function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
}

const selectClothesOptions = [
  { value: "jean", label: "Jean", color: "blue" },
  { value: "kaki", label: "Kaki", color: "orange" },
  { value: "shirt", label: "Shirt", color: "white" },
  { value: "polo", label: "Polo", color: "indigo" },
  { value: "cardigan", label: "Cardigan", color: "gray" },
  { value: "t-shirt", label: "T-shirt", color: "black" },
  { value: "trouser", label: "Trouser", color: "stone" },
  { value: "sweater", label: "Sweater", color: "cyan" },
  { value: "short", label: "Short", color: "emerald" },
  { value: "hoodie", label: "Hoodie", color: "fuchsia" },
  { value: "henley", label: "Henley", color: "green" },
  { value: "jacket", label: "Jacket", color: "zinc" },
  { value: "blazer", label: "Blazer", color: "blue" },
  { value: "leather", label: "Leather", color: "amber" },
  { value: "coat", label: "Coat", color: "black" },
  { value: "overcoat", label: "Overcoat", color: "orange" },
  { value: "sweatsuit", label: "Sweatsuit", color: "green" },
  { value: "outerwear", label: "Outerwear", color: "yellow" },
  { value: "suit", label: "Suit", color: "slate" },
];

const selectTypesOptions = [
  { value: "formal", label: "Formal" },
  { value: "casual", label: "Casual" },
];

export { debounce, selectClothesOptions, selectTypesOptions };
