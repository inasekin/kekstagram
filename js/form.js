import {checkMaxStringLength, checkArrayDuplicates, isEscapeKey} from './utils.js';
import {MAX_COMMENT_LENGTH, MAX_HASHTAG_LENGTH, MAX_HASHTAG_ARRAY_LENGTH, REGULAR_EXPRESSION} from './data.js';

const imageUploadInput = document.querySelector('.img-upload__input');
const imageUploadOverlay = document.querySelector('.img-upload__overlay');
const imageUploadCancel = document.querySelector('.img-upload__cancel');
const textHashtags = document.querySelector('.text__hashtags');
const textComment = document.querySelector('.text__description');

const hashtagValidation = () => {
  textHashtags.value = textHashtags.value.replace(/\s+/g, ' ');
  const newArrayOfHashtags = textHashtags.value.toLowerCase().split(' ');

  newArrayOfHashtags.forEach((hashtag) => {
    if (newArrayOfHashtags[0] === '') {
      textHashtags.value = textHashtags.value.trim();
      textHashtags.setCustomValidity('');
    } else if (!hashtag.startsWith('#')) {
      textHashtags.setCustomValidity('хеш-тег должен начинаться с решётки #');
    } else if (hashtag === '#'){
      textHashtags.setCustomValidity('хеш-тег не может состоять только из одной решётки #');
    } else if (hashtag.length > MAX_HASHTAG_LENGTH){
      textHashtags.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку #');
    } else if (!REGULAR_EXPRESSION.test(hashtag)){
      textHashtags.setCustomValidity('хеш-тег не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;');
    } else if (newArrayOfHashtags.length > MAX_HASHTAG_ARRAY_LENGTH){
      textHashtags.setCustomValidity('нельзя указать больше пяти хэш-тегов');
    } else if (checkArrayDuplicates(newArrayOfHashtags)){
      textHashtags.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
    } else {
      textHashtags.setCustomValidity('');
    }
  });

  return textHashtags.reportValidity();
};

const commentsValidation = () => {
  if (!checkMaxStringLength(textComment.value, MAX_COMMENT_LENGTH)) {
    textComment.setCustomValidity('длина комментария не может составлять больше 140 символов');
  } else {
    textComment.setCustomValidity('');
  }
  return textComment.reportValidity();
};

textHashtags.addEventListener('input', hashtagValidation);
textComment.addEventListener('input', commentsValidation);

const openPhotoEditing = () => {
  imageUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown',onPhotoEditingEscKeydown);
  imageUploadCancel.addEventListener('click', onUploadCancelClick);
};

const closePhotoEditing = () => {
  imageUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imageUploadInput.value = '';
  document.removeEventListener('keydown',onPhotoEditingEscKeydown);
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

imageUploadInput.addEventListener('change',openPhotoEditing);
