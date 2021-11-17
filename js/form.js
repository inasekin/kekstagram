import {checkMaxStringLength, checkArrayDuplicates, isEscapeKey} from './utils.js';
import {setDefaultScale} from './scale.js';
import {setDefaultFilter} from './slider.js';
import {
  MAX_COMMENT_LENGTH,
  MAX_HASHTAG_LENGTH,
  MAX_HASHTAG_ARRAY_LENGTH,
  REGULAR_EXPRESSION_FOR_HASHTAGS
} from './data.js';

const imageUploadInput = document.querySelector('.img-upload__input');
const imageUploadOverlay = document.querySelector('.img-upload__overlay');
const imageUploadCancel = document.querySelector('.img-upload__cancel');
const textHashtags = document.querySelector('.text__hashtags');
const textComment = document.querySelector('.text__description');
const formUpload = document.querySelector('.img-upload__form');

const checkHashtagValidation = (hashtags) => {
  let resultOfCheckValidation = '';
  for (const hashtag of hashtags) {
    switch (true) {
      case hashtags[0] === '':
        textHashtags.value = textHashtags.value.trim();
        resultOfCheckValidation = '';
        break;
      case !hashtag.startsWith('#'):
        resultOfCheckValidation = 'хеш-тег должен начинаться с решётки #';
        break;
      case hashtag === '#':
        resultOfCheckValidation = 'хеш-тег не может состоять только из одной решётки #';
        break;
      case hashtag.length > MAX_HASHTAG_LENGTH:
        resultOfCheckValidation = 'максимальная длина одного хэш-тега 20 символов, включая решётку #';
        break;
      case !REGULAR_EXPRESSION_FOR_HASHTAGS.test(hashtag):
        resultOfCheckValidation = 'хеш-тег не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;';
        break;
      case hashtags.length > MAX_HASHTAG_ARRAY_LENGTH:
        resultOfCheckValidation = 'нельзя указать больше пяти хэш-тегов';
        break;
      case checkArrayDuplicates(hashtags):
        resultOfCheckValidation = 'один и тот же хэш-тег не может быть использован дважды';
        break;
      default:
        resultOfCheckValidation = null;
    }
  }

  return resultOfCheckValidation;
};

const hashtagValidationHandler = (evt) => {
  evt.target.value = evt.target.value.replace(/\s+/g, ' ');
  const listOfHashtags = evt.target.value.toLowerCase().split(' ');

  if (checkHashtagValidation(listOfHashtags)) {
    evt.target.setCustomValidity(checkHashtagValidation(listOfHashtags));
    evt.target.classList.add('error-input');
  } else {
    evt.target.classList.remove('error-input');
    evt.target.reportValidity('');
  }
};

const commentsValidationHandler = (evt) => {
  if (!checkMaxStringLength(textComment.value, MAX_COMMENT_LENGTH)) {
    evt.target.setCustomValidity(' Длина комментария не может составлять больше 140 символов');
    evt.target.classList.add('error-input');
  } else {
    evt.target.classList.remove('error-input');
    evt.target.setCustomValidity('');
  }

  return evt.target.reportValidity();
};

textHashtags.addEventListener('change', hashtagValidationHandler);
textComment.addEventListener('input', commentsValidationHandler);

const openPhotoEditing = () => {
  imageUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onPhotoEditingKeydown);
  imageUploadCancel.addEventListener('click', onUploadCancelClick);
  setDefaultScale();
};

const closePhotoEditing = () => {
  imageUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imageUploadInput.value = '';
  document.removeEventListener('keydown', onPhotoEditingKeydown);
  imageUploadCancel.removeEventListener('click', onUploadCancelClick);
  setDefaultFilter();
};

function onPhotoEditingKeydown(evt) {
  if (!evt.target.closest('.img-upload__text') && (isEscapeKey(evt.key))) {
    evt.preventDefault();
    closePhotoEditing();
  }
}

function onUploadCancelClick() {
  closePhotoEditing();
}

imageUploadInput.addEventListener('change', openPhotoEditing);
