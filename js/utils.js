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

export {getRandomIntFromRange};

const checkStringMaxLength = (value, maxLength) => !value || value.length <= maxLength;

export {checkStringMaxLength};

const getRandomArrayElement = (elements) => elements[getRandomIntFromRange(0, elements.length - 1)];

export {getRandomArrayElement};

const isEscapeKey = (evt) => evt.key === 'Escape';

export {isEscapeKey};
