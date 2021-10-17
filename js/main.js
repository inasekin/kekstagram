import {descriptions, names, textComments} from './data.js';
import {getRandomInt, checkMaxStringLength} from './util.js';

const MIN_DESCRIPTION_IDENTIFIER = 1;
const MAX_DESCRIPTION_IDENTIFIER = 25;

const MIN_NUMBER_OF_LIKES = 15;
const MAX_NUMBER_OF_LIKES = 200;

const MIN_NUMBER_FOR_LIKES = 1;
const MAX_NUMBER_FOR_LIKES = 6;

const getRandomComment = () => ({
  id: getRandomInt(MIN_DESCRIPTION_IDENTIFIER, MAX_DESCRIPTION_IDENTIFIER),
  avatar: `img/avatar-${getRandomInt(MIN_NUMBER_FOR_LIKES, MAX_NUMBER_FOR_LIKES)}.svg`,
  message: textComments[getRandomInt(0, textComments.length - 1)],
  name: names[getRandomInt(0, names.length - 1)],
});
const getRandomComments = () => Array.from({length: getRandomInt(MIN_NUMBER_FOR_LIKES, MAX_NUMBER_FOR_LIKES)}, () => getRandomComment());
const getRandomPhoto = () => ({
  id: getRandomInt(MIN_DESCRIPTION_IDENTIFIER, MAX_DESCRIPTION_IDENTIFIER),
  url: `photos/${getRandomInt(MIN_DESCRIPTION_IDENTIFIER, MAX_DESCRIPTION_IDENTIFIER)}.jpg`,
  descriptions: descriptions[getRandomInt(0, descriptions.length - 1)],
  likes: getRandomInt(MIN_NUMBER_OF_LIKES, MAX_NUMBER_OF_LIKES),
  comments: getRandomComments(),
});

getRandomComment();
getRandomPhoto();
checkMaxStringLength('Какой-то тестовый комментарий', 140);
