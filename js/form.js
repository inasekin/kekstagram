import {checkMaxStringLength, checkArrayDuplicates, isEscapeKey} from './utils.js';
import {setDefaultScale} from './scale.js';
import {defaultFilter} from './slider.js';
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

const enabledHashtagError = () => {
  textHashtags.classList.add('error-input');
};

const hashtagValidationHandler = (evt) => {
    evt.target.value = evt.target.value.replace(/\s+/g, ' ');
    const listOfHashtags = evt.target.value.toLowerCase().split(' ');

    for (const hashtag of listOfHashtags) {
      switch (true) {
        case listOfHashtags[0] === '':
          textHashtags.value = textHashtags.value.trim();
          textHashtags.setCustomValidity('');
          enabledHashtagError();
          break;
        case !hashtag.startsWith('#'):
          textHashtags.setCustomValidity('хеш-тег должен начинаться с решётки #');
          enabledHashtagError();
          break;
        case hashtag === '#':
          textHashtags.setCustomValidity('хеш-тег не может состоять только из одной решётки #');
          enabledHashtagError();
          break;
        case hashtag.length > MAX_HASHTAG_LENGTH:
          textHashtags.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку #');
          enabledHashtagError();
          break;
        case !REGULAR_EXPRESSION_FOR_HASHTAGS.test(hashtag):
          textHashtags.setCustomValidity('хеш-тег не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;');
          enabledHashtagError();
          break;
        case listOfHashtags.length > MAX_HASHTAG_ARRAY_LENGTH:
          textHashtags.setCustomValidity('нельзя указать больше пяти хэш-тегов');
          enabledHashtagError();
          break;
        case checkArrayDuplicates(listOfHashtags):
          textHashtags.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
          enabledHashtagError();
          break;
        default:
          textHashtags.classList.remove('error-input');
      }
    }

    return evt.target.reportValidity();
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
  defaultFilter();
};

const closePhotoEditing = () => {
  imageUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imageUploadInput.value = '';
  document.removeEventListener('keydown', onPhotoEditingKeydown);
  imageUploadCancel.removeEventListener('click', onUploadCancelClick);
};

function onPhotoEditingKeydown(evt) {
  if (!evt.target.closest('.img-upload__text') && (isEscapeKey(evt))) {
    evt.preventDefault();
    closePhotoEditing();
  }
}

function onUploadCancelClick() {
  closePhotoEditing();
}

imageUploadInput.addEventListener('change', openPhotoEditing);
