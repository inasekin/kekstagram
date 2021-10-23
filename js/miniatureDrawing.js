import {getArrayOfPhotos} from './util.js';

const picturesBlock = document.querySelector('.pictures');
const randomUserImageTemplate = document.querySelector('#picture').content.querySelector('a.picture');
const similarListFragment = document.createDocumentFragment();

const photos = getArrayOfPhotos();
photos.forEach((photo) => {
  const photoElement = randomUserImageTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
  similarListFragment.appendChild(photoElement);
});

picturesBlock.appendChild(similarListFragment);
