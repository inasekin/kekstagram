import {openFullSizePictureModal} from './fullsize-photo.js';
import {getData} from './api.js';

const picturesContainer = document.querySelector('.pictures');
const randomUserImageTemplate = document.querySelector('#picture').content.querySelector('a.picture');
const LOAD_IMAGES_URL = 'https://24.javascript.pages.academy/kekstagram/data';

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
  const photosListFragment = document.createDocumentFragment();
  posts.forEach((post) => {
    const picture = renderPhoto(post);
    picture.dataset.id = post.id;
    photosListFragment.appendChild(picture);
  });
  picturesContainer.appendChild(photosListFragment);
  return picturesContainer;
};

getData(LOAD_IMAGES_URL).then((pictures) => {
  renderPhotos(pictures);
});

const openPictureHandler = (evt) => {
  const pictureImg = evt.target.closest('a[class="picture"]');
  if (pictureImg) {
    evt.preventDefault();
    const elementId = Number(pictureImg.dataset.id);
    getData(LOAD_IMAGES_URL).then((pictures) => {
      const currentPicture = pictures.find((el) => el.id === elementId);
      openFullSizePictureModal(currentPicture);
    });
  }
};
picturesContainer.addEventListener('click', openPictureHandler);
