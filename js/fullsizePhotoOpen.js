const fullSizePictureModal = document.querySelector('.big-picture');
const fullSizePictureModalImg = fullSizePictureModal.querySelector('.big-picture__img img');
const likesCount = fullSizePictureModal.querySelector('.likes-count');
const commentsCount = fullSizePictureModal.querySelector('.comments-count');
const bodyNode = document.getElementsByTagName('body')[0];
const closePictureBtn = document.getElementById('picture-cancel');
const socialComments = fullSizePictureModal.querySelector('.social__comments');
const socialCaption = document.querySelector('.social__caption');
const commentTemplate = document.querySelector('#social-comment').content.querySelector('.social__comment');

const commentCounter = document.querySelector('.social__comment-count');
const btnLoadNewComments = document.querySelector('.comments-loader');

const openFullSizePictureModal = () => {
  fullSizePictureModal.classList.remove('hidden');
  bodyNode.classList.add('modal-open');
  commentCounter.classList.add('hidden');
  btnLoadNewComments.classList.add('hidden');
};
const closeFullSizePictureModal = () => {
  fullSizePictureModal.classList.add('hidden');
  bodyNode.classList.remove('modal-open');
  commentCounter.classList.remove('hidden');
  btnLoadNewComments.classList.remove('hidden');
  document.removeEventListener('click', closeFullSizePictureModal);
};
closePictureBtn.addEventListener('click', closeFullSizePictureModal);

const escapeKey = ({key}) => key === 'Escape';
const onCloseEscapeKeydown = (evt) => {
  if (escapeKey(evt)) {
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
  socialComments.innerHTML = '';
  socialComments.appendChild(commentsFragments);
  return socialComments.querySelectorAll('.social__comment');
};

export const renderFullSizePictureModal = (picture) => {
  openFullSizePictureModal();
  fullSizePictureModalImg.src = picture.url;
  likesCount.textContent = picture.likes;
  commentsCount.textContent = picture.comments.length;
  generateComments(picture.comments);
  socialCaption.textContent = picture.description;
  document.addEventListener('keydown', onCloseEscapeKeydown);
};
