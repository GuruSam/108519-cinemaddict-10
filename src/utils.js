export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const getRandomNumber = (min, max) => Math.floor(Math.random() * ((max + 1) - min) + min);

export const getRandomArrayItem = (array) => array[getRandomNumber(0, array.length - 1)];

export const getRandomBoolean = () => Math.random() > 0.5;

export const formatTime = (time) => {
  const hours = time / 60 ^ 0;
  const minutes = time % 60;

  return `${hours}h ${minutes}m`;
};

export const createElement = (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template;

  return element.firstChild;
};

export const render = (container, element, place = RenderPosition.BEFOREEND) => {
  if (place === RenderPosition.AFTERBEGIN) {
    container.prepend(element);
    return;
  }

  container.append(element);
};

export const isEscPressed = (evt) => {
  return evt.key === `Escape` || evt.key === `Esc`;
};
