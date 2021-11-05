import {generatePhotos, getPhotos} from './data.js';
import {showPopup} from './popup.js';

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
    thumbnail.dataset.photoId = photo.id;
    thumbnailsFragment.appendChild(thumbnail);
  });

  thumbnailListElement.appendChild(thumbnailsFragment);

  thumbnailListElement.addEventListener('click', (evt) => {
    const picture = evt.target.closest('.picture');
    if (picture) {
      evt.preventDefault();
      const photoId = parseInt(picture.dataset.photoId, 10);
      const photo = photos.find((x) => x.id === photoId);
      showPopup(photo);
    }
  });
};

addThumbnails();
