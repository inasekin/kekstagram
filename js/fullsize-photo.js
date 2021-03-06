import {isEscapeKey} from './utils.js';
import {MAX_ADD_COMMENTS} from './data.js';

export const fullSizePictureModal = document.querySelector('.big-picture');
export const formImg = document.querySelector('.img-upload__preview img');
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

let lastCommentIndex = 0;
let currentPostCommentsArray = [];

const clearComments = () => {
  socialComments.innerHTML = '';
};

clearComments();

const createComment = (commentEl) => {
  const commentFragment = commentTemplate.cloneNode(true);
  commentFragment.querySelector('.social__picture').src = `${commentEl.avatar}`;
  commentFragment.querySelector('.social__picture').alt = `${commentEl.name}`;
  commentFragment.querySelector('.social__text').textContent = `${commentEl.message}`;

  return commentFragment;
};

const createComments = (commentsArray) => {
  const comments = commentsArray.slice(lastCommentIndex, lastCommentIndex + MAX_ADD_COMMENTS);
  const listOfComments = document.createDocumentFragment();

  comments.forEach((comment) => {
    const element = createComment(comment);
    listOfComments.appendChild(element);
  });

  lastCommentIndex = lastCommentIndex + listOfComments.childElementCount;
  commentCounterViews.textContent = lastCommentIndex;
  return listOfComments;
};

const addCommentsToPostHandler = () => {
  socialComments.appendChild(createComments(currentPostCommentsArray));
  if (lastCommentIndex >= currentPostCommentsArray.length) {
    btnLoadNewComments.classList.add('hidden');
  } else {
    btnLoadNewComments.classList.remove('hidden');
  }
};

const onCloseKeydown = (evt) => {
  if (isEscapeKey(evt.key)) {
    evt.preventDefault();
    closeFullSizePictureModalHandler();
  }
};

const renderFullSizePictureModal = (picture) => {
  currentPostCommentsArray = picture.comments;
  lastCommentIndex = 0;

  fullSizePictureModalImg.src = picture.url;
  likesCount.textContent = picture.likes;
  commentsCount.textContent = picture.comments.length;
  socialCaption.textContent = picture.description;

  commentCounterViews.textContent = lastCommentIndex;
  clearComments();
  addCommentsToPostHandler(currentPostCommentsArray);
  bodyNode.classList.add('modal-open');
  fullSizePictureModal.classList.remove('hidden');

  document.addEventListener('keydown', onCloseKeydown);
};

export const openFullSizePictureModal = (picture) => {
  renderFullSizePictureModal(picture);

  document.addEventListener('keydown', onCloseKeydown);
  btnLoadNewComments.addEventListener('click', addCommentsToPostHandler);
  closePictureBtn.addEventListener('click', closeFullSizePictureModalHandler);
};

export function closeFullSizePictureModalHandler() {
  fullSizePictureModal.classList.add('hidden');
  bodyNode.classList.remove('modal-open');
  clearComments();

  document.removeEventListener('click', closeFullSizePictureModalHandler);

  btnLoadNewComments.removeEventListener('click', addCommentsToPostHandler);
  closePictureBtn.removeEventListener('click', closeFullSizePictureModalHandler);
}

export const setImageScale = (value) => {
  formImg.style.transform = `scale(${value})`;
};

export const resetImage = () => {
  formImg.className = '';
  formImg.style = '';
};

