export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const userRatings = [
  {
    title: `Novice`,
    min: 0,
    max: 9
  },
  {
    title: `Fun`,
    min: 10,
    max: 19
  },
  {
    title: `Movie Buff`,
    min: 20,
    max: 30
  }
];

export const getRandomNumber = (min, max) => Math.floor(Math.random() * ((max + 1) - min) + min);

export const getRandomArrayItem = (array) => array[getRandomNumber(0, array.length - 1)];

export const getRandomBoolean = () => Math.random() > 0.5;

export const formatTime = (time) => {
  const hours = time / 60 ^ 0;
  const minutes = time % 60;

  return `${hours}h ${minutes}m`;
};

export const formatDate = (date) => {
  const currentDate = new Date().getDate();
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

  let result = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${hours}:${minutes}`;

  switch (true) {
    case date.getDate() === currentDate:
      result = `Today`;
      break;
    case (date.getDate() + 1) === currentDate:
      result = `Yesterday`;
      break;
    case (date.getDate() + 2) === currentDate:
      result = `2 days ago`;
      break;
  }

  return result;
};

export const createElement = (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template;

  return element.firstElementChild;
};

export const render = (container, component, place = RenderPosition.BEFOREEND) => {
  if (place === RenderPosition.AFTERBEGIN) {
    container.prepend(component.getElement());
    return;
  }

  container.append(component.getElement());
};

export const isEscPressed = (evt) => {
  return evt.key === `Escape` || evt.key === `Esc`;
};
