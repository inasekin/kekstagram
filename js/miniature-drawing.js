import {
  MIN_DESCRIPTION_IDENTIFIER,
  MAX_DESCRIPTION_IDENTIFIER,
  MIN_NUMBER_OF_LIKES,
  MAX_NUMBER_OF_LIKES,
  MIN_NUMBER_FOR_LIKES,
  MAX_NUMBER_FOR_LIKES,
  DESCRIPTIONS,
  NAMES,
  COMMENTS
} from './data.js';
import {getRandomInt} from './utils.js';
import {openFullSizePictureModal} from './fullsize-photo.js';

const getRandomComment = () => ({
  id: getRandomInt(MIN_DESCRIPTION_IDENTIFIER, MAX_DESCRIPTION_IDENTIFIER),
  avatar: `img/avatar-${getRandomInt(MIN_NUMBER_FOR_LIKES, MAX_NUMBER_FOR_LIKES)}.svg`,
  message: COMMENTS[getRandomInt(0, COMMENTS.length - 1)],
  name: NAMES[getRandomInt(0, NAMES.length - 1)],
});

const getRandomComments = () => Array.from({length: getRandomInt(MIN_NUMBER_FOR_LIKES, MAX_NUMBER_OF_LIKES)}, () => getRandomComment());

const getRandomPhoto = () => ({
  id: getRandomInt(MIN_DESCRIPTION_IDENTIFIER, MAX_DESCRIPTION_IDENTIFIER),
  url: `photos/${getRandomInt(MIN_DESCRIPTION_IDENTIFIER, MAX_DESCRIPTION_IDENTIFIER)}.jpg`,
  DESCRIPTIONS: DESCRIPTIONS[getRandomInt(0, DESCRIPTIONS.length - 1)],
  likes: getRandomInt(MIN_NUMBER_OF_LIKES, MAX_NUMBER_OF_LIKES),
  comments: getRandomComments(),
});

const getArrayOfPhotos = () => Array.from({length: MAX_DESCRIPTION_IDENTIFIER}, () => getRandomPhoto());

const picturesContainer = document.querySelector('.pictures');
const randomUserImageTemplate = document.querySelector('#picture').content.querySelector('a.picture');
const photosList = getArrayOfPhotos();

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
renderPhotos(photosList);

const openPictureHandler = (evt) => {
  const pictureImg = evt.target.closest('a[class="picture"]');
  if (pictureImg) {
    const elementId = Number(pictureImg.dataset.id);
    const currentPicture = photosList.find((el) => el.id === elementId);
    openFullSizePictureModal(currentPicture);
  }
};
picturesContainer.addEventListener('click', openPictureHandler);
