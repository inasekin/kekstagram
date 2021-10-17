function getRandomInt(min, max) {
  if (min >= 0 && max >= 0 && max >= min) {
    const minUpdate = Math.ceil(min);
    const maxUpdate = Math.floor(max);
    return Math.floor(Math.random() * (maxUpdate - minUpdate)) + minUpdate;
  } else {
    return null;
  }
}

function checkMaxStringLength(checkedString, maxLength) {
  return checkedString.length <= maxLength;
}

export {getRandomInt, checkMaxStringLength};
