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
  { value: "jean", label: "Jean" },
  { value: "kaki", label: "Kaki" },
  { value: "shirt", label: "Shirt" },
  { value: "polo", label: "Polo" },
  { value: "cardigan", label: "Cardigan" },
  { value: "t-shirt", label: "T-shirt" },
  { value: "trouser", label: "Trouser" },
  { value: "sweater", label: "Sweater" },
  { value: "short", label: "Short" },
  { value: "hoodie", label: "Hoodie" },
  { value: "henley", label: "Henley" },
  { value: "jacket", label: "Jacket" },
  { value: "blazer", label: "Blazer" },
  { value: "leather", label: "Leather" },
  { value: "coat", label: "Coat" },
  { value: "overcoat", label: "Overcoat" },
  { value: "sweatsuit", label: "Sweatsuit" },
  { value: "outerwear", label: "Outerwear" },
  { value: "suit", label: "Suit" },
];

const selectTypesOptions = [
  { value: "formal", label: "Formal" },
  { value: "casual", label: "Casual" },
];

export { debounce, selectClothesOptions, selectTypesOptions };
