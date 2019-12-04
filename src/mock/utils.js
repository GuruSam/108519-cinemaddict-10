const getRandomNumber = (min, max) => Math.floor(Math.random() * ((max + 1) - min) + min);

const getRandomArrayItem = (array) => array[getRandomNumber(0, array.length - 1)];

const getRandomBoolean = () => Math.random() > 0.5;

const formatTime = (time) => {
  const hours = time / 60 ^ 0;
  const minutes = time % 60;

  return `${hours}h ${minutes}m`;
};

export {getRandomNumber, getRandomArrayItem, getRandomBoolean, formatTime};
