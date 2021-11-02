import {generatePhotos, getPhotos} from './data.js';

const addThumbnails = () => {
  const thumbnailListElement = document.querySelector('.pictures');
  const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

  generatePhotos();
  const photos = getPhotos();

  const thumbnailsFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const thumbnail = thumbnailTemplate.cloneNode(true);
    thumbnail.querySelector('.picture__img').src = photo.url;
    thumbnail.querySelector('.picture__likes').textContent = photo.likes;
    thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;
    thumbnailsFragment.appendChild(thumbnail);
  });

  thumbnailListElement.appendChild(thumbnailsFragment);
};

addThumbnails();
