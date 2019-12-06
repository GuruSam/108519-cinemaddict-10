import SortComponent from "../components/sort";
import NoDataComponent from "../components/no-data";
import FilmSectionComponent from "../components/film-section";
import ExtraSectionComponent from "../components/extra-film-section";
import FilmCardComponent from "../components/film-card";
import {isEscPressed, render} from "../utils";
import FilmDetailsComponent from "../components/film-details";
import ShowMoreButtonComponent from "../components/show-more-btn";

const TOTAL_FILM_AMOUNT = 10;
const INITIAL_FILM_AMOUNT = 5;
const LOADED_FILM_AMOUNT = 5;
const EXTRA_FILM_AMOUNT = 2;

const renderFilm = (film, section) => {
  const filmCard = new FilmCardComponent(film);
  const filmDetails = new FilmDetailsComponent(film);

  filmCard.setClickHandler((evt) => {
    if (evt.target.matches(`.film-card__title`) ||
      evt.target.matches(`.film-card__poster`) ||
      evt.target.matches(`.film-card__comments`)) {
      render(section.closest(`.main`), filmDetails);

      const onEscPress = (keyEvt) => {
        if (isEscPressed(keyEvt)) {
          filmDetails.removeElement();
          document.removeEventListener(`keydown`, onEscPress);
        }
      };

      filmDetails.setCloseButtonHandler(() => {
        filmDetails.removeElement();
      });

      document.addEventListener(`keydown`, onEscPress);
    }
  });

  render(section.querySelector(`.films-list__container`), filmCard);
};

export default class PageController {
  constructor(container) {
    this._container = container;

    this._sortComponent = new SortComponent();
    this._noDataComponent = new NoDataComponent();
    this._filmSectionComponent = new FilmSectionComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
  }

  render(filmList) {
    const filmSection = this._filmSectionComponent.getElement();
    render(this._container, this._sortComponent);
    render(this._container, this._filmSectionComponent);

    if (filmList.length) {
      for (let i = 0; i < INITIAL_FILM_AMOUNT; i++) {
        renderFilm(filmList[i], filmSection);
      }

      // Сортировка фильмов по Top Rated и Most Commented
      const topRatedFilms = filmList.slice()
        .sort((a, b) => b.rating - a.rating).slice(0, EXTRA_FILM_AMOUNT);
      const mostCommentedFilms = filmList.slice()
        .sort((a, b) => b.comments.length - a.comments.length).slice(0, EXTRA_FILM_AMOUNT);

      if (topRatedFilms.every((film) => film.rating !== 0)) {
        render(filmSection, new ExtraSectionComponent(`Top Rated`));
      }

      if (mostCommentedFilms.every((film) => film.comments !== 0)) {
        render(filmSection, new ExtraSectionComponent(`Most Commented`));
      }

      const extraSections = filmSection.querySelectorAll(`.films-list--extra`);

      topRatedFilms.forEach((film) =>
        renderFilm(film, extraSections[0]));
      mostCommentedFilms.forEach((film) =>
        renderFilm(film, extraSections[1]));
    } else {
      filmSection.replaceChild(this._noDataComponent.getElement(), filmSection.querySelector(`.films-list`));
    }

    // Рендер кнопки Show More и установка клик-события
    if (filmList.length > INITIAL_FILM_AMOUNT) {
      render(filmSection.querySelector(`.films-list`), this._showMoreButtonComponent);

      this._showMoreButtonComponent.setClickHandler(() => {
        let filmsLoaded = filmSection.querySelectorAll(`.films-list .film-card`).length;
        const loadMoreAmount = filmsLoaded + LOADED_FILM_AMOUNT;

        filmList.slice(filmsLoaded, loadMoreAmount)
          .forEach((film) => {
            renderFilm(film, filmSection);
            filmsLoaded++;
          });

        if (filmsLoaded === TOTAL_FILM_AMOUNT) {
          this._showMoreButtonComponent.removeElement();
        }
      });
    }
  }

}
