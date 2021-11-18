import {openFullSizePictureModal, fullSizePictureModal} from './fullsize-photo.js';
import {getData} from './api.js';
import {RANDOM_IMGS_COUNT, DELAY, OPACITY} from './data.js';

const picturesContainer = document.querySelector('.pictures');
const randomUserImageTemplate = document.querySelector('#picture').content.querySelector('a.picture');
const LOAD_IMAGES_URL = 'https://24.javascript.pages.academy/kekstagram/data';
let userPictures = [];

const filters = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed',
};

const removePictures = (picturesElements) => {
  if (picturesElements.length > 0) {
    picturesElements.forEach((element) => {
      element.remove();
    });
  }
};

const renderPhoto = (post) => {
  const clonePhotoElements = randomUserImageTemplate.cloneNode(true);
  const photoComments = clonePhotoElements.querySelector('.picture__comments');
  const photoLikes = clonePhotoElements.querySelector('.picture__likes');
  const photo = clonePhotoElements.querySelector('.picture__img');
  photo.src = post.url;
  photoComments.textContent = post.comments.length;
  photoLikes.textContent = post.likes;
  return clonePhotoElements;
};

const renderPhotos = (posts) => {
  const pictureContainerElement = document.querySelector('.pictures');
  const picturesElements = pictureContainerElement.querySelectorAll('.picture');

  removePictures(picturesElements);
  const photosListFragment = document.createDocumentFragment();
  posts.forEach((post) => {
    const picture = renderPhoto(post);
    picture.dataset.id = post.id;
    photosListFragment.appendChild(picture);
  });

  picturesContainer.appendChild(photosListFragment);
  userPictures = posts;

  return picturesContainer;
};

const findPicture = (id, pictures) => pictures.find((picture) => picture.id === id);

const imgFilterElement = document.querySelector('.img-filters--inactive');
const imgFilterFormElement = imgFilterElement.querySelector('.img-filters__form');
let imgFilterDefaultElement = imgFilterElement.querySelector('#filter-default');

const createImgFilterForm = (pictures) => {
  const defaultPictures = pictures;
  const sortedPictures = pictures;

  imgFilterFormElement.addEventListener('click', _.throttle(() => onFilterClick(defaultPictures, sortedPictures), DELAY),
  );
  return sortedPictures;
};

export const createImgFilter = (pictures) => {
  imgFilterElement.style.opacity = OPACITY;
  return createImgFilterForm(pictures);
};

getData(LOAD_IMAGES_URL).then((pictures) => {
  renderPhotos(pictures);
  createImgFilter(pictures);
});

const openPictureHandler = (evt) => {
  const pictureImg = evt.target.closest('a[class="picture"]');
  if (pictureImg) {
    evt.preventDefault();
    const elementId = Number(pictureImg.dataset.id);
    const currentPicture = findPicture(elementId, userPictures);
    openFullSizePictureModal(currentPicture);
  }
};
picturesContainer.addEventListener('click', openPictureHandler);

const getRandomImages = (pictures, picturesCount) => {
  const newArray = [];
  while (newArray.length < picturesCount) {
    const randomNumber = _.random(0, picturesCount);
    if (!newArray.includes(pictures[randomNumber])) {
      newArray.push(pictures[randomNumber]);
    }
  }
  return newArray;
};

const removeCloseFullSizePictureModalEventListener = () => {
  fullSizePictureModal.removeEventListener('click', openPictureHandler);
};

function onFilterClick(defaultPictures, sortedPictures) {
  if (
    !document.activeElement.classList.contains('img-filters__button--active')
  ) {
    imgFilterDefaultElement.classList.remove('img-filters__button--active');
    imgFilterDefaultElement = document.activeElement;
    imgFilterDefaultElement.classList.add('img-filters__button--active');
  }
  switch (document.activeElement.id) {
    case filters.default:
      removeCloseFullSizePictureModalEventListener();
      renderPhotos(defaultPictures);
      openFullSizePictureModal(defaultPictures);
      break;
    case filters.random:
      sortedPictures = getRandomImages(defaultPictures, RANDOM_IMGS_COUNT);
      removeCloseFullSizePictureModalEventListener();
      renderPhotos(sortedPictures);
      openFullSizePictureModal(sortedPictures);
      break;
    case filters.discussed:
      sortedPictures = _.sortBy(defaultPictures, 'likes').reverse();
      removeCloseFullSizePictureModalEventListener();
      renderPhotos(sortedPictures);
      openFullSizePictureModal(sortedPictures);
      break;
  }
}
