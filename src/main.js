import {createFilmCardTemplate} from './components/film-card.js';
import {createFilmDetailsTemplate} from './components/film-details.js';
import {createFilmFiltersTemplate} from './components/film-filters.js';
import {createFilmSectionTemplate} from './components/film-section.js';
import {createShowMoreBtnTemplate} from './components/show-more-btn.js';
import {createProfileRatingTemplate} from './components/profile-rating.js';
import {createExtraSectionTemplate} from "./components/extra-film-section";
import {generateFilters} from "./mock/filters";
import {generateRandomFilm} from "./mock/film";
import {getRandomNumber} from "./mock/utils";

const TOTAL_FILM_AMOUNT = 10;
const INITIAL_FILM_AMOUNT = 5;
const LOADED_FILM_AMOUNT = 5;
const EXTRA_FILM_AMOUNT = 2;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

// Рендер шапки и контент-блока
const mainContainer = document.querySelector(`.main`);
const headerContainer = document.querySelector(`.header`);

render(headerContainer, createProfileRatingTemplate(getRandomNumber(0, 30)));
render(mainContainer, createFilmSectionTemplate());

// Генерация случайных фильмов
const filmList = [];

for (let i = 0; i < TOTAL_FILM_AMOUNT; i++) {
  filmList.push(generateRandomFilm(i + 1));
}

// Рендер фильмов
const filmListContainer = mainContainer.querySelector(`.films`);

for (let i = 0; i < INITIAL_FILM_AMOUNT; i++) {
  render(filmListContainer.querySelector(`.films-list__container`), createFilmCardTemplate(filmList[i]));
}

// Рендер фильтров
const filters = generateFilters(filmList);
render(mainContainer, createFilmFiltersTemplate(filters), `afterbegin`);

// Сортировка фильмов по Top Rated и Most Commented
const topRatedFilms = filmList.slice()
  .sort((a, b) => b.rating - a.rating).slice(0, EXTRA_FILM_AMOUNT);
const mostCommentedFilms = filmList.slice()
  .sort((a, b) => b.comments - a.comments).slice(0, EXTRA_FILM_AMOUNT);

if (topRatedFilms.every((film) => film.rating !== 0)) {
  render(filmListContainer, createExtraSectionTemplate(`Top Rated`));
}

if (mostCommentedFilms.every((film) => film.comments !== 0)) {
  render(filmListContainer, createExtraSectionTemplate(`Most Commented`));
}

const extraSections = filmListContainer.querySelectorAll(`.films-list--extra`);

topRatedFilms.forEach((film) =>
  render(extraSections[0].querySelector(`.films-list__container`), createFilmCardTemplate(film)));
mostCommentedFilms.forEach((film) =>
  render(extraSections[1].querySelector(`.films-list__container`), createFilmCardTemplate(film)));

// Рендер кнопки Show More и установка клик-события
render(filmListContainer.querySelector(`.films-list`), createShowMoreBtnTemplate());

const showMoreBtn = filmListContainer.querySelector(`.films-list__show-more`);

showMoreBtn.onclick = () => {
  let filmsLoaded = document.querySelectorAll(`.films-list .film-card`).length;
  const loadMoreAmount = filmsLoaded + LOADED_FILM_AMOUNT;

  filmList.slice(filmsLoaded, loadMoreAmount)
    .forEach((film) => {
      render(filmListContainer.querySelector(`.films-list__container`), createFilmCardTemplate(film));
      filmsLoaded++;
    });

  if (filmsLoaded === TOTAL_FILM_AMOUNT) {
    showMoreBtn.remove();
  }
};

// Попап с детальной информацией по фильму
const onFilmClick = (evt) => {
  if (evt.target.matches(`.film-card__title`) || evt.target.matches(`.film-card__poster`)) {
    const clickedCardId = parseInt(evt.target.parentNode.getAttribute(`data-id`), 10);

    for (const film of filmList) {
      if (film.id === clickedCardId) {
        render(mainContainer, createFilmDetailsTemplate(film));
      }
    }

    const filmDetails = mainContainer.querySelector(`.film-details`);
    const closeBtn = filmDetails.querySelector(`.film-details__close-btn`);
    const onCloseBtnClick = () => filmDetails.remove();

    closeBtn.onclick = (onCloseBtnClick);
  }
};

const filmsSection = mainContainer.querySelector(`.films`);
filmsSection.onclick = (onFilmClick);
