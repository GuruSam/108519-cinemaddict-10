import SortComponent from "../components/sort";
import NoDataComponent from "../components/no-data";
import FilmSectionComponent from "../components/film-section";
import ExtraSectionComponent from "../components/extra-film-section";
import ShowMoreButtonComponent from "../components/show-more-btn";
import {render, renderFilm, remove} from "../utils/render";
import {Films} from "../utils/const";

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
      for (let i = 0; i < Films.INITIAL_AMOUNT; i++) {
        renderFilm(filmList[i], filmSection);
      }

      // Сортировка фильмов по Top Rated и Most Commented
      const topRatedFilms = filmList.slice()
        .sort((a, b) => b.rating - a.rating).slice(0, Films.EXTRA_FILM_AMOUNT);
      const mostCommentedFilms = filmList.slice()
        .sort((a, b) => b.comments.length - a.comments.length).slice(0, Films.EXTRA_FILM_AMOUNT);

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
    if (filmList.length > Films.INITIAL_AMOUNT) {
      render(filmSection.querySelector(`.films-list`), this._showMoreButtonComponent);

      this._showMoreButtonComponent.setClickHandler(() => {
        let filmsLoaded = filmSection.querySelectorAll(`.films-list .film-card`).length;
        const loadMoreAmount = filmsLoaded + Films.LOAD_AMOUNT;

        filmList.slice(filmsLoaded, loadMoreAmount)
          .forEach((film) => {
            renderFilm(film, filmSection);
            filmsLoaded++;
          });

        if (filmsLoaded === Films.TOTAL_AMOUNT) {
          remove(this._showMoreButtonComponent);
        }
      });
    }
  }

}
