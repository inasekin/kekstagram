import {isEscapeKey} from './utils.js';

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

const commentCounter = document.querySelector('.social__comment-count');
const btnLoadNewComments = document.querySelector('.comments-loader');
let currentCommentCount = 5;

const openFullSizePictureModal = () => {
  fullSizePictureModal.classList.remove('hidden');
  bodyNode.classList.add('modal-open');
};
const closeFullSizePictureModal = () => {
  socialComments.textContent = '';
  fullSizePictureModal.classList.add('hidden');
  bodyNode.classList.remove('modal-open');
  document.removeEventListener('click', closeFullSizePictureModal);
};
closePictureBtn.addEventListener('click', closeFullSizePictureModal);

const onCloseEscapeKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullSizePictureModal();
    document.removeEventListener('keydown', onCloseEscapeKeydown);
  }
};

const generateComment = (commentEl) => {
  const commentFragments = commentTemplate.cloneNode(true);
  const commentAvatar = commentFragments.querySelector('.social__picture');
  const commentName = commentFragments.querySelector('.social__picture');
  const commentText = commentFragments.querySelector('.social__text');

  commentAvatar.src = commentEl.avatar;
  commentName.alt = commentEl.name;
  commentText.textContent = commentEl.message;

  return commentFragments;
};

const generateComments = (comments) => {
  const commentsFragments = document.createDocumentFragment();

  comments.forEach((comment) => {
    const commentary = generateComment(comment);
    commentsFragments.appendChild(commentary);
  });

  return commentsFragments;
};

const loadNewCommentsHandler = (element) => {
  const nextCommentCount = 5 + currentCommentCount;
  const nextComments = element.comments.slice(currentCommentCount, nextCommentCount);

  currentCommentCount = 5 + nextComments.length;
  commentCounterViews.textContent = currentCommentCount;
  socialComments.appendChild(generateComments(nextComments));

  if (element.comments.length <= currentCommentCount) {
    btnLoadNewComments.classList.add('hidden');
  }
};

export const renderFullSizePictureModal = (picture) => {
  openFullSizePictureModal();
  fullSizePictureModalImg.src = picture.url;
  likesCount.textContent = picture.likes;
  commentCounterViews.textContent = '5';
  commentsCount.textContent = picture.comments.length;

  if (picture.comments.length > currentCommentCount) {
    btnLoadNewComments.classList.remove('hidden');
    const currentComments = picture.comments.slice(0, currentCommentCount);
    socialComments.appendChild(generateComments(currentComments));

    btnLoadNewComments.addEventListener('click', () => {
      loadNewCommentsHandler(picture);
    });
  } else {
    commentCounter.classList.add('hidden');
    btnLoadNewComments.classList.add('hidden');
    socialComments.appendChild(generateComments(picture.comments));
  }

  socialCaption.textContent = picture.description;
  document.addEventListener('keydown', onCloseEscapeKeydown);
};
