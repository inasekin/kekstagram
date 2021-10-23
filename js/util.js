import {
  DESCRIPTIONS,
  NAMES,
  COMMENTS,
  getRandomComments,
  MIN_DESCRIPTION_IDENTIFIER,
  MAX_DESCRIPTION_IDENTIFIER,
  MIN_NUMBER_OF_LIKES,
  MAX_NUMBER_OF_LIKES,
  MIN_NUMBER_FOR_LIKES,
  MAX_NUMBER_FOR_LIKES
} from './data.js';

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

const getRandomComment = () => ({
  id: getRandomInt(MIN_DESCRIPTION_IDENTIFIER, MAX_DESCRIPTION_IDENTIFIER),
  avatar: `img/avatar-${getRandomInt(MIN_NUMBER_FOR_LIKES, MAX_NUMBER_FOR_LIKES)}.svg`,
  message: COMMENTS[getRandomInt(0, COMMENTS.length - 1)],
  name: NAMES[getRandomInt(0, NAMES.length - 1)],
});

const getRandomPhoto = () => ({
  id: getRandomInt(MIN_DESCRIPTION_IDENTIFIER, MAX_DESCRIPTION_IDENTIFIER),
  url: `photos/${getRandomInt(MIN_DESCRIPTION_IDENTIFIER, MAX_DESCRIPTION_IDENTIFIER)}.jpg`,
  DESCRIPTIONS: DESCRIPTIONS[getRandomInt(0, DESCRIPTIONS.length - 1)],
  likes: getRandomInt(MIN_NUMBER_OF_LIKES, MAX_NUMBER_OF_LIKES),
  comments: getRandomComments(),
});

function getArrayOfPhotos () {
  return Array(MAX_DESCRIPTION_IDENTIFIER).fill(null).map(getRandomPhoto);
}

getRandomComment();
getRandomPhoto();
checkMaxStringLength('Какой-то тестовый комментарий', 140);

export {getRandomInt, checkMaxStringLength, getRandomComment, getRandomPhoto, getArrayOfPhotos};
