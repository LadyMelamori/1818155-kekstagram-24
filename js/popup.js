import {isEscapeKey} from './utils.js';

const popupElement = document.querySelector('.big-picture');
const popupImgElement = popupElement.querySelector('.big-picture__img img');
const popupLikesCountElement = popupElement.querySelector('.likes-count');
const popupCommentsCountElement = popupElement.querySelector('.comments-count');
const popupCommentsListElement = popupElement.querySelector('.social__comments');
const popupCaptionElement = popupElement.querySelector('.social__caption');
const popupShownCommentsCountElement = popupElement.querySelector('.social__comment-count');
const popupCommentsLoaderElement = popupElement.querySelector('.comments-loader');
const popupCloseButtonElement = popupElement.querySelector('.big-picture__cancel');
const bodyElement = document.querySelector('body');

const getCommentMarkup = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const commentAvatar = document.createElement('img');
  commentAvatar.classList.add('social__picture');
  commentAvatar.src = comment.avatar;
  commentAvatar.alt = comment.name;
  commentAvatar.width = 35;
  commentAvatar.height = 35;
  commentElement.appendChild(commentAvatar);

  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = comment.message;
  commentElement.appendChild(commentText);

  return commentElement;
};

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    closePopup();
  }
};

const showPopup = (photo) => {
  popupElement.classList.remove('hidden');

  popupImgElement.src = photo.url;
  popupLikesCountElement.textContent = photo.likes;
  popupCommentsCountElement.textContent = photo.comments.length;

  const commentsMarkup = photo.comments.map((x) => getCommentMarkup(x));
  const commentsFragment = document.createDocumentFragment();
  commentsMarkup.forEach((comment) => commentsFragment.appendChild(comment));
  popupCommentsListElement.innerHTML = '';
  popupCommentsListElement.appendChild(commentsFragment);

  popupCaptionElement.textContent = photo.description;

  popupShownCommentsCountElement.classList.add('hidden');
  popupCommentsLoaderElement.classList.add('hidden');

  bodyElement.classList.add('modal-open');

  document.addEventListener('keydown', onPopupEscKeydown);
};

const closePopup = () => {
  popupElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
};

popupCloseButtonElement.addEventListener('click', closePopup);

export {showPopup};
