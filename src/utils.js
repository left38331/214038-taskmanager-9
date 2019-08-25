const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const Sorting = {
  DEFAULT: `default`,
  DATE_UP: `date-up`,
  DATE_DOWN: `date-down`
};

const createElement = (template, numberElement = `firstElement`) => {
  let newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  if (numberElement === `firstElement`) {
    newElement = newElement.firstChild;
  }

  return newElement;
};

const render = (container, element, place) => {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
  }
};

const unrender = (element) => {
  if (element) {
    element.remove();
  }
};

export {Position, Sorting, createElement, render, unrender};
