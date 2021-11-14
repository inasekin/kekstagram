import {isEscapeKey} from './utils.js';
import {MAX_ADD_COMMENTS} from './data.js';

const fullSizePictureModal = document.querySelector('.big-picture');
const fullSizePictureModalImg = fullSizePictureModal.querySelector('.big-picture__img img');
const likesCount = fullSizePictureModal.querySelector('.likes-count');
const commentsCount = fullSizePictureModal.querySelector('.comments-count');
const commentCounterViews = fullSizePictureModal.querySelector('.social__comment-count-amount');
const bodyNode = document.getElementsByTagName('body')[0];
const closePictureBtn = document.getElementById('picture-cancel');
const socialComments = fullSizePictureModal.querySelector('.social__comments');
const socialCaption = document.querySelector('.social__caption');
const commentTemplate = document.querySelector('#social-comment').content.querySelector('.social__comment');
const btnLoadNewComments = document.querySelector('.comments-loader');

const clearComments = () => {
  socialComments.innerHTML = '';
};

clearComments();

const generateComments = (commentEl) => {
  const commentFragments = commentTemplate.cloneNode(true);
  commentFragments.classList.add('hidden');
  commentFragments.querySelector('.social__picture').src = `${commentEl.avatar}`;
  commentFragments.querySelector('.social__picture').alt = `${commentEl.name}`;
  commentFragments.querySelector('.social__text').textContent = `${commentEl.message}`;
  socialComments.append(commentFragments);
};

const showGeneratedComments = () => {
  const hiddenComments = socialComments.querySelectorAll('.social__comment.hidden');
  Array.from(hiddenComments).slice(0, MAX_ADD_COMMENTS).forEach((comment) => comment.classList.remove('hidden'));
  const allComments = socialComments.querySelectorAll('.social__comment');
  const visibleComments = socialComments.querySelectorAll('.social__comment:not(.hidden)');
  commentCounterViews.textContent = visibleComments.length;

  if (allComments.length === visibleComments.length) {
    btnLoadNewComments.classList.add('hidden');
  } else {
    btnLoadNewComments.classList.remove('hidden');
  }
};

const onCloseEscapeKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullSizePictureModal();
    document.removeEventListener('keydown', onCloseEscapeKeydown);
  }
};

const renderFullSizePictureModal = (picture) => {
  bodyNode.classList.add('modal-open');
  fullSizePictureModal.classList.remove('hidden');

  fullSizePictureModalImg.src = picture.url;
  likesCount.textContent = picture.likes;
  commentsCount.textContent = picture.comments.length;
  socialCaption.textContent = picture.description;

  picture.comments.forEach(generateComments);
  showGeneratedComments();

  document.addEventListener('keydown', onCloseEscapeKeydown);
};

export const openFullSizePictureModal = (picture) => {
  renderFullSizePictureModal(picture);

  document.addEventListener('keydown', onCloseEscapeKeydown);

  btnLoadNewComments.addEventListener('click', showGeneratedComments);
  closePictureBtn.addEventListener('click', closeFullSizePictureModal);
};

function closeFullSizePictureModal() {
  fullSizePictureModal.classList.add('hidden');
  bodyNode.classList.remove('modal-open');
  clearComments();

  document.removeEventListener('click', closeFullSizePictureModal);

  btnLoadNewComments.removeEventListener('click', showGeneratedComments);
  closePictureBtn.removeEventListener('click', closeFullSizePictureModal);
}
