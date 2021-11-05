import {checkMaxStringLength, checkArrayDuplicates, isEscapeKey} from './utils.js';
import {MAX_COMMENT_LENGTH, MAX_HASHTAG_LENGTH, MAX_HASHTAG_ARRAY_LENGTH, REGULAR_EXPRESSION_FOR_HASHTAGS} from './data.js';

const imageUploadInput = document.querySelector('.img-upload__input');
const imageUploadOverlay = document.querySelector('.img-upload__overlay');
const imageUploadCancel = document.querySelector('.img-upload__cancel');
const textHashtags = document.querySelector('.text__hashtags');
const textComment = document.querySelector('.text__description');

const hashtagValidation = () => {
  textHashtags.value = textHashtags.value.replace(/\s+/g, ' ');
  const listOfHashtags = textHashtags.value.toLowerCase().split(' ');

  for (const hashtag of listOfHashtags) {switch (true) {
    case listOfHashtags[0] === '':
      textHashtags.value = textHashtags.value.trim();
      textHashtags.setCustomValidity('');
      textHashtags.classList.add('error-input');
      break;
    case !hashtag.startsWith('#'):
      textHashtags.setCustomValidity('хеш-тег должен начинаться с решётки #');
      textHashtags.classList.add('error-input');
      break;
    case hashtag === '#':
      textHashtags.setCustomValidity('хеш-тег не может состоять только из одной решётки #');
      textHashtags.classList.add('error-input');
      break;
    case hashtag.length > MAX_HASHTAG_LENGTH:
      textHashtags.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку #');
      textHashtags.classList.add('error-input');
      break;
    case !REGULAR_EXPRESSION_FOR_HASHTAGS.test(hashtag):
      textHashtags.setCustomValidity('хеш-тег не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;');
      textHashtags.classList.add('error-input');
      break;
    case listOfHashtags.length > MAX_HASHTAG_ARRAY_LENGTH:
      textHashtags.setCustomValidity('нельзя указать больше пяти хэш-тегов');
      textHashtags.classList.add('error-input');
      break;
    case checkArrayDuplicates(listOfHashtags):
      textHashtags.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
      textHashtags.classList.add('error-input');
      break;
    default:
      textHashtags.classList.remove('error-input');
      textHashtags.setCustomValidity('');
  }}

  return textHashtags.reportValidity();
};

const commentsValidation = () => {
  if (!checkMaxStringLength(textComment.value, MAX_COMMENT_LENGTH)) {
    textComment.setCustomValidity(' Длина комментария не может составлять больше 140 символов');
    textComment.classList.add('error-input');
  } else {
    textComment.classList.remove('error-input');
    textComment.setCustomValidity('');
  }

  return textComment.reportValidity();
};

textHashtags.addEventListener('change', hashtagValidation);
textComment.addEventListener('input', commentsValidation);

const openPhotoEditing = () => {
  imageUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onPhotoEditingEscKeydown);
  imageUploadCancel.addEventListener('click', onUploadCancelClick);
};

const closePhotoEditing = () => {
  imageUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imageUploadInput.value = '';
  document.removeEventListener('keydown', onPhotoEditingEscKeydown);
  imageUploadCancel.removeEventListener('click', onUploadCancelClick);
};

function onPhotoEditingEscKeydown(evt) {
  if (!evt.target.closest('.img-upload__text') && (isEscapeKey(evt))) {
    evt.preventDefault();
    closePhotoEditing();
  }
}

function onUploadCancelClick() {
  closePhotoEditing();
}

imageUploadInput.addEventListener('change', openPhotoEditing);
