function getRandomIntFromRange(from, to) {
  if (from < 0 || to < 0) {
    return -1;
  }

  if (to < from) {
    return -1;
  }

  from = Math.ceil(from);
  to = Math.floor(to);

  const difference = to - from;
  const rand = Math.random();

  return Math.floor(rand * (difference + 1)) + from;
}

getRandomIntFromRange(1, 3);
