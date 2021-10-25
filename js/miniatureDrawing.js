import {MIN_DESCRIPTION_IDENTIFIER,
  MAX_DESCRIPTION_IDENTIFIER,
  MIN_NUMBER_OF_LIKES,
  MAX_NUMBER_OF_LIKES,
  MIN_NUMBER_FOR_LIKES,
  MAX_NUMBER_FOR_LIKES,
  DESCRIPTIONS,
  NAMES,
  COMMENTS
} from './data.js';
import {getRandomInt} from './util.js';

const getRandomComment = () => ({
  id: getRandomInt(MIN_DESCRIPTION_IDENTIFIER, MAX_DESCRIPTION_IDENTIFIER),
  avatar: `img/avatar-${getRandomInt(MIN_NUMBER_FOR_LIKES, MAX_NUMBER_FOR_LIKES)}.svg`,
  message: COMMENTS[getRandomInt(0, COMMENTS.length - 1)],
  name: NAMES[getRandomInt(0, NAMES.length - 1)],
});

const getRandomComments = () => Array.from({length: getRandomInt(MIN_NUMBER_FOR_LIKES, MAX_NUMBER_FOR_LIKES)}, () => getRandomComment());

const getRandomPhoto = () => ({
  id: getRandomInt(MIN_DESCRIPTION_IDENTIFIER, MAX_DESCRIPTION_IDENTIFIER),
  url: `photos/${getRandomInt(MIN_DESCRIPTION_IDENTIFIER, MAX_DESCRIPTION_IDENTIFIER)}.jpg`,
  DESCRIPTIONS: DESCRIPTIONS[getRandomInt(0, DESCRIPTIONS.length - 1)],
  likes: getRandomInt(MIN_NUMBER_OF_LIKES, MAX_NUMBER_OF_LIKES),
  comments: getRandomComments(),
});

function getArrayOfPhotos () {
  return Array.from(Array(MAX_DESCRIPTION_IDENTIFIER), (getRandomPhoto));
}
const picturesContainer = document.querySelector('.pictures');
const randomUserImageTemplate = document.querySelector('#picture').content.querySelector('a.picture');
const photosListFragment = document.createDocumentFragment();

const photosList = getArrayOfPhotos();

function generatePhotos()  {
  photosList.forEach((photo) => {
    const photoElement = randomUserImageTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photosListFragment.appendChild(photoElement);
  });
  return picturesContainer.appendChild(photosListFragment);
}

generatePhotos();
