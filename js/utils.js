export const getRandomInt = (min, max) => {
  if (min >= 0 && max >= 0 && max >= min) {
    const minUpdate = Math.ceil(min);
    const maxUpdate = Math.floor(max);
    return Math.floor(Math.random() * (maxUpdate - minUpdate)) + minUpdate;
  } else {
    return null;
  }
};

export const checkMaxStringLength = (checkedString, maxLength) => checkedString.length <= maxLength;

export const checkArrayDuplicates = (array) => (new Set(array)).size !== array.length;

export const isEscapeKey = (key) => {
  if (key === 'Escape') {
    return true;
  }
};
