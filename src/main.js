import FilmCardComponent from './components/film-card.js';
import FilmDetailsComponent from './components/film-details.js';
import FilterComponent from './components/filter.js';
import SortComponent from "./components/sort";
import FilmSectionComponent from './components/film-section.js';
import ShowMoreButtonComponent from './components/show-more-btn.js';
import ProfileRatingComponent from "./components/profile-rating";
import ExtraSectionComponent from "./components/extra-film-section";
import NoDataComponent from "./components/no-data";
import {generateFilters} from "./mock/filters";
import {generateRandomFilm} from "./mock/film";
import {getRandomNumber} from "./utils";
import {render, isEscPressed, RenderPosition} from "./utils";

const TOTAL_FILM_AMOUNT = 10;
const INITIAL_FILM_AMOUNT = 5;
const LOADED_FILM_AMOUNT = 5;
const EXTRA_FILM_AMOUNT = 2;

const renderFilm = (film, section) => {
  const filmCard = new FilmCardComponent(film).getElement();
  const filmDetails = new FilmDetailsComponent(film).getElement();

  const onFilmClick = (evt) => {
    if (evt.target.matches(`.film-card__title`) ||
    evt.target.matches(`.film-card__poster`) ||
    evt.target.matches(`.film-card__comments`)) {
      render(mainContainer, filmDetails);

      const closeBtn = filmDetails.querySelector(`.film-details__close-btn`);
      const onCloseBtnClick = () => {
        filmDetails.remove();
        closeBtn.removeEventListener(`click`, onCloseBtnClick);
      };

      const onEscPress = (keyEvt) => {
        if (isEscPressed(keyEvt)) {
          filmDetails.remove();
          document.removeEventListener(`keydown`, onEscPress);
        }
      };

      closeBtn.addEventListener(`click`, onCloseBtnClick);
      document.addEventListener(`keydown`, onEscPress);
    }
  };

  filmCard.onclick = (onFilmClick);

  render(section.querySelector(`.films-list__container`), filmCard);
};

// Генерация случайных фильмов
const filmList = [];

for (let i = 0; i < TOTAL_FILM_AMOUNT; i++) {
  filmList.push(generateRandomFilm(i + 1));
}

// Рендер меню и контент-блока
const mainContainer = document.querySelector(`.main`);
const headerContainer = document.querySelector(`.header`);

render(headerContainer, new ProfileRatingComponent(getRandomNumber(0, 30)).getElement());

const filmSectionComponent = new FilmSectionComponent().getElement();
render(mainContainer, filmSectionComponent);
render(mainContainer, new SortComponent().getElement(), RenderPosition.AFTERBEGIN);

// Рендер фильтров
const filters = generateFilters(filmList);
render(mainContainer, new FilterComponent(filters).getElement(), RenderPosition.AFTERBEGIN);

// Рендер фильмов
if (filmList.length) {
  for (let i = 0; i < INITIAL_FILM_AMOUNT; i++) {
    renderFilm(filmList[i], filmSectionComponent);
  }

  // Сортировка фильмов по Top Rated и Most Commented
  const topRatedFilms = filmList.slice()
    .sort((a, b) => b.rating - a.rating).slice(0, EXTRA_FILM_AMOUNT);
  const mostCommentedFilms = filmList.slice()
    .sort((a, b) => b.comments - a.comments).slice(0, EXTRA_FILM_AMOUNT);

  if (topRatedFilms.every((film) => film.rating !== 0)) {
    render(filmSectionComponent, new ExtraSectionComponent(`Top Rated`).getElement());
  }

  if (mostCommentedFilms.every((film) => film.comments !== 0)) {
    render(filmSectionComponent, new ExtraSectionComponent(`Most Commented`).getElement());
  }

  const extraSections = filmSectionComponent.querySelectorAll(`.films-list--extra`);

  topRatedFilms.forEach((film) =>
    renderFilm(film, extraSections[0]));
  mostCommentedFilms.forEach((film) =>
    renderFilm(film, extraSections[1]));
} else {
  filmSectionComponent.replaceChild(new NoDataComponent().getElement(), filmSectionComponent.querySelector(`.films-list`));
}

// Рендер кнопки Show More и установка клик-события
if (filmList.length > INITIAL_FILM_AMOUNT) {
  const showMoreBtn = new ShowMoreButtonComponent().getElement();

  render(filmSectionComponent.querySelector(`.films-list`), showMoreBtn);

  showMoreBtn.onclick = () => {
    let filmsLoaded = filmSectionComponent.querySelectorAll(`.films-list .film-card`).length;
    const loadMoreAmount = filmsLoaded + LOADED_FILM_AMOUNT;

    filmList.slice(filmsLoaded, loadMoreAmount)
      .forEach((film) => {
        renderFilm(film, filmSectionComponent);
        filmsLoaded++;
      });

    if (filmsLoaded === TOTAL_FILM_AMOUNT) {
      showMoreBtn.remove();
    }
  };
}
