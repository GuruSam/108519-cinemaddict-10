import FilterComponent from './components/filter.js';
import ProfileRatingComponent from "./components/profile-rating";
import {generateFilters} from "./mock/filters";
import {generateRandomFilms} from "./mock/film";
import {getRandomNumber} from "./utils";
import {render, RenderPosition} from "./utils";
import PageController from "./controllers/PageController";

const TOTAL_FILM_AMOUNT = 10;

// const renderFilm = (film, section) => {
//   const filmCard = new FilmCardComponent(film);
//   const filmDetails = new FilmDetailsComponent(film);
//
//   const onFilmClickHandler = (evt) => {
//     if (evt.target.matches(`.film-card__title`) ||
//       evt.target.matches(`.film-card__poster`) ||
//       evt.target.matches(`.film-card__comments`)) {
//       render(mainContainer, filmDetails);
//
//       const onEscPress = (keyEvt) => {
//         if (isEscPressed(keyEvt)) {
//           filmDetails.removeElement();
//           document.removeEventListener(`keydown`, onEscPress);
//         }
//       };
//
//       filmDetails.setCloseButtonHandler(() => {
//         filmDetails.removeElement();
//       });
//
//       document.addEventListener(`keydown`, onEscPress);
//     }
//   };
//
//   filmCard.setClickHandler(onFilmClickHandler);
//
//   render(section.querySelector(`.films-list__container`), filmCard);
// };

// Генерация случайных фильмов
const filmList = generateRandomFilms(TOTAL_FILM_AMOUNT);

// Рендер меню и контент-блока
const mainContainer = document.querySelector(`.main`);
const headerContainer = document.querySelector(`.header`);

render(headerContainer, new ProfileRatingComponent(getRandomNumber(0, 30)));

// const filmSectionComponent = new FilmSectionComponent();
// const filmSection = filmSectionComponent.getElement();
//
// render(mainContainer, filmSectionComponent);
// render(mainContainer, new SortComponent(), RenderPosition.AFTERBEGIN);

// Рендер фильтров
const filters = generateFilters(filmList);
render(mainContainer, new FilterComponent(filters), RenderPosition.AFTERBEGIN);

const page = new PageController(mainContainer);
page.render(filmList);

// Рендер фильмов
// if (filmList.length) {
//   for (let i = 0; i < INITIAL_FILM_AMOUNT; i++) {
//     renderFilm(filmList[i], filmSection);
//   }
//
//   // Сортировка фильмов по Top Rated и Most Commented
//   const topRatedFilms = filmList.slice()
//     .sort((a, b) => b.rating - a.rating).slice(0, EXTRA_FILM_AMOUNT);
//   const mostCommentedFilms = filmList.slice()
//     .sort((a, b) => b.comments - a.comments).slice(0, EXTRA_FILM_AMOUNT);
//
//   if (topRatedFilms.every((film) => film.rating !== 0)) {
//     render(filmSection, new ExtraSectionComponent(`Top Rated`));
//   }
//
//   if (mostCommentedFilms.every((film) => film.comments !== 0)) {
//     render(filmSection, new ExtraSectionComponent(`Most Commented`));
//   }
//
//   const extraSections = filmSection.querySelectorAll(`.films-list--extra`);
//
//   topRatedFilms.forEach((film) =>
//     renderFilm(film, extraSections[0]));
//   mostCommentedFilms.forEach((film) =>
//     renderFilm(film, extraSections[1]));
// } else {
//   filmSectionComponent.replaceChild(new NoDataComponent().getElement(), filmSection.querySelector(`.films-list`));
// }

// // Рендер кнопки Show More и установка клик-события
// if (filmList.length > INITIAL_FILM_AMOUNT) {
//   const showMoreBtn = new ShowMoreButtonComponent();
//
//   render(filmSection.querySelector(`.films-list`), showMoreBtn);
//
//   const onShowMoreBtnClick = () => {
//     let filmsLoaded = filmSection.querySelectorAll(`.films-list .film-card`).length;
//     const loadMoreAmount = filmsLoaded + LOADED_FILM_AMOUNT;
//
//     filmList.slice(filmsLoaded, loadMoreAmount)
//       .forEach((film) => {
//         renderFilm(film, filmSection);
//         filmsLoaded++;
//       });
//
//     if (filmsLoaded === TOTAL_FILM_AMOUNT) {
//       showMoreBtn.getElement().remove();
//     }
//   };
//
//   showMoreBtn.setClickHandler(onShowMoreBtnClick);
// }
