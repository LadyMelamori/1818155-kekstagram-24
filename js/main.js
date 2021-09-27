const getRandomIntFromRange = (from, to) => {
  if (from < 0 || to < 0 || to < from) {
    return -1;
  }

  const fromRounded = Math.ceil(from);
  const toRounded = Math.floor(to);

  const difference = toRounded - fromRounded;
  const rand = Math.random();

  return Math.floor(rand * (difference + 1)) + fromRounded;
};

const checkStringMaxLength = (value, maxLength) => !value || value.length <= maxLength;

getRandomIntFromRange(1, 3);
checkStringMaxLength('Утренние потягушки Кекса', 140);
