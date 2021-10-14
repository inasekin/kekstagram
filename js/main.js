
function getRandomInt(min, max) {
  if (min >= 0 && max >= 0 && max >= min) {
    const minUpdate = Math.ceil(min);
    const maxUpdate = Math.floor(max);
    return Math.floor(Math.random() * (maxUpdate - minUpdate)) + minUpdate;
  } else {
    return null;
  }
}

function checkMaxStringLength(checkedString, maxLength) {
  return checkedString.length <= maxLength;
}

getRandomInt(10, 0);
checkMaxStringLength('Какой-то тестовый комментарий', 140);

const description = [
  'Весело',
  'Осень',
  'На учебе',
  'скучно',
];

const names = [
  'Иван',
  'Марк',
  'Евгений',
  'Мария',
  'Ангелина',
  'Илья',
  'Вера',
];

const textComments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const getArrayPart = (array) => array[getRandomInt(0, array.length - 1)];

const getRandomMessage = () => getArrayPart(textComments);

const getRandomName = () => getArrayPart(names);

const getRandomIndex = () => getRandomInt(1, 25);

const getRandomComment = () => ({
  id: getRandomIndex(),
  avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
  message: getRandomMessage(),
  name: getRandomName(),
});

const getRandomComments = () => Array.from({length: getRandomInt(1, 3)}, (value, index) => getRandomComment(index));

const getRandomLikes = () => getRandomInt(15, 200);

const getRandomDescription = () => getArrayPart(description);

const getRandomPhoto = () => ({
  id: getRandomIndex(), // случайное число от 1-25 (index)
  url: `photos/${getRandomInt(1, 25)}.jpg`,
  description: getRandomDescription(),
  likes: getRandomLikes(),
  comments: getRandomComments(),
});

getRandomPhoto();
