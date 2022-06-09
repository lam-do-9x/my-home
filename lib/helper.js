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

function removeDuplicateArrayObject(arr) {
  const uniqueIds = [];

  return arr.filter((element) => {
    const isDuplicate = uniqueIds.includes(element.id);

    if (!isDuplicate) {
      uniqueIds.push(element.id);

      return true;
    }

    return false;
  });
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export { debounce, removeDuplicateArrayObject, capitalizeFirstLetter };
