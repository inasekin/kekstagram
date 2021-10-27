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

const escapeKey = (evt) => evt.key === 'Escape';
const onCloseEscapeKeydown = function(evt) {
  if (escapeKey(evt)) {
    evt.preventDefault();
    closeFullSizePictureModal();
  }
};

export function closeFullSizePictureModal() {
  fullSizePictureModal.classList.add('hidden');
  bodyNode.classList.remove('modal-open');
  commentCounter.classList.remove('hidden');
  btnLoadNewComments.classList.remove('hidden');
  document.removeEventListener('keydown', onCloseEscapeKeydown);
}

export function renderFullSizePictureModal (picture) {
  fullSizePictureModal.classList.remove('hidden');
  bodyNode.classList.add('modal-open');
  commentCounter.classList.add('hidden');
  btnLoadNewComments.classList.add('hidden');

  fullSizePictureModalImg.src = picture.url;
  likesCount.textContent = picture.likes;
  commentsCount.textContent = picture.comments.length;

  picture.comments.forEach((comment) => {
    let commentFragment = document.createDocumentFragment();
    commentFragment = commentTemplate.cloneNode(true);
    commentFragment.querySelector('.social__picture').src = comment.avatar;
    commentFragment.querySelector('.social__picture').alt = comment.name;
    commentFragment.querySelector('.social__text').textContent = comment.message;
    socialComments.appendChild(commentFragment);
  });

  socialCaption.textContent = picture.description;

  document.addEventListener('keydown', onCloseEscapeKeydown);

  closePictureBtn.addEventListener('click', () => {
    closeFullSizePictureModal();
    socialComments.innerHTML = '';
  });
}
