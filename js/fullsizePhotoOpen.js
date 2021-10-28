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

function openFullSizePictureModal () {
  fullSizePictureModal.classList.remove('hidden');
  bodyNode.classList.add('modal-open');
  commentCounter.classList.add('hidden');
  btnLoadNewComments.classList.add('hidden');
}

function closeFullSizePictureModal() {
  fullSizePictureModal.classList.add('hidden');
  bodyNode.classList.remove('modal-open');
  commentCounter.classList.remove('hidden');
  btnLoadNewComments.classList.remove('hidden');
  document.removeEventListener('keydown', onCloseEscapeKeydown);
  document.removeEventListener('click', closeFullSizePictureModal);
}

closePictureBtn.addEventListener('click', closeFullSizePictureModal);

export function renderFullSizePictureModal (picture) {
  openFullSizePictureModal();
  fullSizePictureModalImg.src = picture.url;
  likesCount.textContent = picture.likes;
  commentsCount.textContent = picture.comments.length;

  function generateComment(comment) {
    let commentFragments = document.createDocumentFragment();
    commentFragments = commentTemplate.cloneNode(true);
    const commentAvatar = commentFragments.querySelector('.social__picture');
    const commentName = commentFragments.querySelector('.social__picture');
    const commentText = commentFragments.querySelector('.social__text');
    commentAvatar.src = comment.avatar;
    commentName.alt = comment.name;
    commentText.textContent = comment.message;
    return commentFragments;
  }

  function generateComments(comments) {
    const commentsFragments = document.createDocumentFragment();
    comments.forEach((comment) => {
      const Commentary = generateComment(comment);
      commentsFragments.appendChild(Commentary);
    });
    socialComments.innerHTML = '';
    socialComments.appendChild(commentsFragments);
    return socialComments.querySelectorAll('.social__comment');
  }

  generateComments(picture.comments);

  socialCaption.textContent = picture.description;

  document.addEventListener('keydown', onCloseEscapeKeydown);
}
