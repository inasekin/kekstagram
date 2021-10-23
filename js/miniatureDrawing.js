import {getArrayOfPhotos} from './util.js';

const picturesContainer = document.querySelector('.pictures');
const randomUserImageTemplate = document.querySelector('#picture').content.querySelector('a.picture');
const photosListFragment = document.createDocumentFragment();

const photosList = getArrayOfPhotos();
photosList.forEach((photo) => {
  const photoElement = randomUserImageTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
  photosListFragment.appendChild(photoElement);
});

picturesContainer.appendChild(photosListFragment);
