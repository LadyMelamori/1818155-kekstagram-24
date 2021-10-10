import {generatePhotos, getPhotos} from './data.js';

generatePhotos();
const photos = getPhotos();
photos; // чтоб eslint не ругался на never used
