//Функция, возвращающая случайное целое число из переданного диапазона включительно (MDN web docs)
function getRandomInt(min, max) {
  if (min >= 0 && max >= 0 && max >= min) {
    let minUpdate = Math.ceil(min);
    let maxUpdate = Math.floor(max);
    return Math.floor(Math.random() * (maxUpdate - minUpdate)) + minUpdate;
  } else {
    return null;
  }
}

//Функция для проверки максимальной длины строки
function checkMaxStringLength(checkedString, maxLength) {
  return checkedString.length <= maxLength;
}

//Инициализация функций
getRandomInt(10, 0);
checkMaxStringLength('Какой-то тестовый комментарий', 140);
