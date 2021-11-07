import {isEscapeKey, checkStringMaxLength} from './utils.js';

const DESCRIPTION_MAX_LENGTH = 140;

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

const onTextInputEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
  }
};

const validateHashtags = (hashtagsString) => {
  const splittedHashtags = hashtagsString.split(' ');
  const hashtags = splittedHashtags.filter((value) => value.length > 0);

  const errorMessages = [];

  if (hashtags.some((x) => !x.startsWith('#'))) {
    errorMessages.push('Хештег должен начинаться с символа # (решётка).');
  }

  const letterDigitRegexp = /^[A-Za-zА-Яа-яЁё0-9]*$/;
  if (hashtags.some((x) => !letterDigitRegexp.test(x.startsWith('#') ? x.substring(1) : ''))) {
    errorMessages.push('Строка после решётки должна состоять из букв и чисел.');
  }

  if (hashtags.some((x) => x === '#')) {
    errorMessages.push('Хештег не может состоять только из одной решётки.');
  }

  if (hashtags.some((x) => x.length > 20)) {
    errorMessages.push('Максимальная длина одного хештега 20 символов, включая решётку.');
  }

  if ((new Set(hashtags)).size !== hashtags.length) {
    errorMessages.push('Один и тот же хештег не может быть использован дважды.');
  }

  if (hashtags.length > 5) {
    errorMessages.push('Нельзя указать больше пяти хештегов.');
  }

  if (errorMessages.length > 0) {
    const errorMessage = errorMessages.join('\n');
    hashtagsInputElement.setCustomValidity(errorMessage);
  } else {
    hashtagsInputElement.setCustomValidity('');
  }

  hashtagsInputElement.reportValidity();
};

const validateDescription = (description) => {
  if (!checkStringMaxLength(description, DESCRIPTION_MAX_LENGTH)) {
    descriptionInputElement.setCustomValidity('Длина комментария не может составлять больше 140 символов.');
  } else {
    descriptionInputElement.setCustomValidity('');
  }

  descriptionInputElement.reportValidity();
};

const init = () => {
  uploadInputElement.addEventListener('change', showForm);
  closeFormButtonElement.addEventListener('click', closeForm);

  hashtagsInputElement.addEventListener('keydown', onTextInputEscKeydown);
  descriptionInputElement.addEventListener('keydown', onTextInputEscKeydown);

  hashtagsInputElement.addEventListener('input', () => {
    validateHashtags(hashtagsInputElement.value);
  });

  hashtagsInputElement.addEventListener('focus', () => {
    validateHashtags(hashtagsInputElement.value);
  });

  descriptionInputElement.addEventListener('input', () => {
    validateDescription(descriptionInputElement.value);
  });

  descriptionInputElement.addEventListener('focus', () => {
    validateDescription(descriptionInputElement.value);
  });
};

init();
