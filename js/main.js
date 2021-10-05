//Функция, возвращающая случайное целое число из переданного диапазона включительно (MDN web docs)
function getRandomInt(min, max) {
  if (min >= 0 && max >= 0) {
    if (max <= min) {
      console.log('Не верно задан диапазон!');
    } else {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }
  } else {
    console.log('Диапозон может состоять только из положительных значений');
  }
}

//Функция для проверки максимальной длины строки
function checkMaxStringLength(checkedString, maxLength) {
  return checkedString.length <= maxLength;
}

//Инициализация функций
getRandomInt(0, 5);
checkMaxStringLength('Какой-то тестовый комментарий', 140);