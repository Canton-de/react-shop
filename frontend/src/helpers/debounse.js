function debounce(cb, ms) {
  let savedArguments;
  let isDebouncing = false;
  return function debounceWrapper(...args) {
    if (isDebouncing) {
      savedArguments = args;
      return;
    }
    cb(...args);
    isDebouncing = true;
    setTimeout(() => {
      isDebouncing = false;
      if (savedArguments) {
        debounceWrapper(...savedArguments);
        savedArguments = null;
      }
    }, ms);
  };
}

export default debounce;
