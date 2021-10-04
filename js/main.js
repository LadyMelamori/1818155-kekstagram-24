const PHOTO_COUNT = 25;
const MAX_COMMENTS_PER_PHOTO = 100;
const MAX_COMMENT_ID = MAX_COMMENTS_PER_PHOTO * PHOTO_COUNT + 100000;

const COMMENT_PHRASES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const AUTHOR_NAMES = [
  'Вадим Макеев',
  'Константин Серебрянский',
  'Владимир Великий',
  'Анастасия Соболько',
  'Ольга Кудрявцева',
  'Никита Ленивец',
  'Андрей Джипегов',
  'Анна Каренина',
  'Игорь Стонкс',
  'Сергей Грегорович',
];

const getRandomIntFromRange = (from, to) => {
  if (from < 0 || to < 0 || to < from) {
    throw 'Invalid parameters';
  }

  const fromRounded = Math.ceil(from);
  const toRounded = Math.floor(to);

  const difference = toRounded - fromRounded;
  const rand = Math.random();

  return Math.floor(rand * (difference + 1)) + fromRounded;
};

const checkStringMaxLength = (value, maxLength) => !value || value.length <= maxLength;

checkStringMaxLength('Утренние потягушки Кекса', 140);

const getRandomArrayElement = (elements) => elements[getRandomIntFromRange(0, elements.length - 1)];

const getCommentText = () => {
  const phrasesNumber = getRandomIntFromRange(1, 2);

  const chosenPhrases = [];
  for (let i = 0; i < phrasesNumber; i++) {
    chosenPhrases.push(getRandomArrayElement(COMMENT_PHRASES));
  }

  return chosenPhrases.join('\n');
};

const usedPhotoCommentIds = [];

const createPhotoComment = () => {
  let id = getRandomIntFromRange(1, MAX_COMMENT_ID);
  while (usedPhotoCommentIds.includes(id)) {
    id = getRandomIntFromRange(1, MAX_COMMENT_ID);
  }
  usedPhotoCommentIds.push(id);

  const avatarId = getRandomIntFromRange(1, 6);

  return {
    id: id,
    avatar: `img/avatar-${avatarId}.svg`,
    message: getCommentText(),
    name: getRandomArrayElement(AUTHOR_NAMES),
  };
};

const createPhoto = (id) => {
  const commentsNumber = getRandomIntFromRange(0, MAX_COMMENTS_PER_PHOTO);
  const comments = Array.from({ length: commentsNumber }, createPhotoComment);

  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: id === 1 ? 'Amazing!' : `${id} times more amazing than the previous photo!`,
    likes: getRandomIntFromRange(15, 200),
    comments: comments,
  };
};

const init = () => {
  const photos = Array.from({ length: PHOTO_COUNT }, (v, i) => createPhoto(i + 1));
  photos; // чтобы линтер не ругался на never used
};

init();
