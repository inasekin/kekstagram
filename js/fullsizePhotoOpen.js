import {isEscapeKey} from './utils.js';

const fullSizePictureModal = document.querySelector('.big-picture');
const fullSizePictureModalImg = fullSizePictureModal.querySelector('.big-picture__img img');
const likesCount = fullSizePictureModal.querySelector('.likes-count');
const commentsCount = fullSizePictureModal.querySelector('.comments-count');
const bodyNode = document.getElementsByTagName('body')[0];
const closePictureBtn = document.getElementById('picture-cancel');
const socialComments = fullSizePictureModal.querySelector('.social__comments');
const socialCaption = document.querySelector('.social__caption');
const commentTemplate = document.querySelector('#social-comment').content.querySelector('.social__comment');

const openFullSizePictureModal = () => {
  fullSizePictureModal.classList.remove('hidden');
  bodyNode.classList.add('modal-open');
};
const closeFullSizePictureModal = () => {
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

export const renderFullSizePictureModal = (picture) => {
  openFullSizePictureModal();
  fullSizePictureModalImg.src = picture.url;
  likesCount.textContent = picture.likes;
  commentsCount.textContent = picture.comments.length;

  const commentCounterViews = document.querySelector('.comments-count-for-viewing');
  const commentCounter = document.querySelector('.social__comment-count');
  const btnLoadNewComments = document.querySelector('.comments-loader');
  const currentCommentCount = 5;
  if (picture.comments.length > currentCommentCount) {
    btnLoadNewComments.classList.remove('hidden');
    const currentComments = picture.comments.slice(0, currentCommentCount);
    console.log(currentComments);
    socialComments.textContent = '';
    socialComments.appendChild(generateComments(currentComments));
    btnLoadNewComments.addEventListener('click', () => {
      const nextCommentCount = 5 + currentComments;
      const nextComments = picture.comments.slice(currentComments, nextCommentCount);
    });
  } else {
    btnLoadNewComments.classList.add('hidden');
  }

  // btnLoadNewComments.addEventListener('click', () => {
  //   picture.comments.length = Number(commentsCount.textContent);
  //   console.log(picture.comments);
  //   socialComments.appendChild(generateComments(picture.comments));
  // });
  // if (picture.comments.length > 5) {
  //   btnLoadNewComments.classList.remove('hidden');
  //   socialComments.innerHTML = '';
  //   picture.comments.length = 5;
  //   commentCounterViews.textContent = 5;
  //   socialComments.appendChild(generateComments(picture.comments));
  // } else {
  //   socialComments.innerHTML = '';
  //   btnLoadNewComments.classList.add('hidden');
  //   socialComments.appendChild(generateComments(picture.comments));
  //   commentCounterViews.textContent = picture.comments.length;
  // }
  socialCaption.textContent = picture.description;
  document.addEventListener('keydown', onCloseEscapeKeydown);
};
