import {isEscapeKey} from './utils.js';

const formElement = document.querySelector('.img-upload__form');
const uploadInputElement = formElement.querySelector('.img-upload__input');
const formEditPhotoElement = formElement.querySelector('.img-upload__overlay');
const hashtagsInputElement = formElement.querySelector('.text__hashtags');
const descriptionInputElement = formElement.querySelector('.text__description');
const closeFormButtonElement = formElement.querySelector('.img-upload__cancel');
const bodyElement = document.querySelector('body');

const onFormEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    closeForm();
  }
};

const showForm = () => {
  formEditPhotoElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onFormEscKeydown);
};

const closeForm = () => {
  formEditPhotoElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onFormEscKeydown);
  formElement.reset();
};

uploadInputElement.addEventListener('change', showForm);
closeFormButtonElement.addEventListener('click', closeForm);

const onTextInputEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
  }
};

hashtagsInputElement.addEventListener('keydown', onTextInputEscKeydown);
descriptionInputElement.addEventListener('keydown', onTextInputEscKeydown);
