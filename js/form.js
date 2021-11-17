import {checkMaxStringLength, checkArrayDuplicates, isEscapeKey} from './utils.js';
import {setDefaultScale} from './scale.js';
import {setDefaultFilter} from './slider.js';
import {
  MAX_COMMENT_LENGTH,
  MAX_HASHTAG_LENGTH,
  MAX_HASHTAG_ARRAY_LENGTH,
  REGULAR_EXPRESSION_FOR_HASHTAGS
} from './data.js';
import {sendData} from './api.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const imageUploadInput = document.querySelector('.img-upload__input');
const imageUploadOverlay = document.querySelector('.img-upload__overlay');
const imageUploadCancel = document.querySelector('.img-upload__cancel');
const textHashtags = document.querySelector('.text__hashtags');
const textComment = document.querySelector('.text__description');
const formUpload = document.querySelector('.img-upload__form');
const imgPreviewElement = imageUploadOverlay.querySelector('.img-upload__preview  > img');

const checkHashtagValidation = (hashtags) => {
  let resultOfCheckValidation = '';
  for (const hashtag of hashtags) {
    switch (true) {
      case hashtags[0] === '':
        textHashtags.value = textHashtags.value.trim();
        return resultOfCheckValidation = '';
      case !hashtag.startsWith('#'):
        return resultOfCheckValidation = 'хеш-тег должен начинаться с решётки #';
      case hashtag === '#':
        return resultOfCheckValidation = 'хеш-тег не может состоять только из одной решётки #';
      case hashtag.length > MAX_HASHTAG_LENGTH:
        return resultOfCheckValidation = 'максимальная длина одного хэш-тега 20 символов, включая решётку #';
      case !REGULAR_EXPRESSION_FOR_HASHTAGS.test(hashtag):
        return resultOfCheckValidation = 'хеш-тег не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;';
      case hashtags.length > MAX_HASHTAG_ARRAY_LENGTH:
        return resultOfCheckValidation = 'нельзя указать больше пяти хэш-тегов';
      case checkArrayDuplicates(hashtags):
        return resultOfCheckValidation = 'один и тот же хэш-тег не может быть использован дважды';
      default:
        return null;
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

  evt.target.reportValidity();
};

textHashtags.addEventListener('change', hashtagValidationHandler);
textComment.addEventListener('input', commentsValidationHandler);

const openPhotoEditing = () => {
  imageUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onPhotoEditingKeydown);
  imageUploadCancel.addEventListener('click', onUploadCancelClick);
  setDefaultScale();

  const file = imageUploadInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (file) {
    if (matches) {
      imgPreviewElement.src = URL.createObjectURL(file);
    }
  }
};

export const closePhotoEditing = () => {
  imageUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imageUploadInput.value = '';
  document.removeEventListener('keydown', onPhotoEditingKeydown);
  imageUploadCancel.removeEventListener('click', onUploadCancelClick);
  setDefaultFilter();
  formUpload.reset();
};

export const sendForm = () => {
  formUpload.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      'https://24.javascript.pages.academy/kekstagram',
      new FormData(evt.target),
    );
  });
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

sendForm();
