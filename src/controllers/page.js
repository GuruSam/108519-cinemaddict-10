import SortComponent from "../components/sort";
import NoDataComponent from "../components/no-data";
import FilmSectionComponent from "../components/film-section";
import ExtraSectionComponent from "../components/extra-film-section";
import ShowMoreButtonComponent from "../components/show-more-btn";
import {render, remove} from "../utils/render";
import {Films} from "../utils/const";
import FilmController from "./film";

export default class PageController {
  constructor(container, filterController, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._sortComponent = new SortComponent();
    this._noDataComponent = new NoDataComponent();
    this._filmSectionComponent = new FilmSectionComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();

    this._filterController = filterController;
    this._filmControllers = [];
    this._extraFilmControllers = [];
    this._moviesModel.onFilterChange(this._onFilterChange);
    this._renderedFilmsAmount = 0;
  }

  renderFilms(filmList, section, countFilms = true) {
    for (const film of filmList) {
      const filmController = new FilmController(section, this._onDataChange);

      if (section.className === `films`) {
        this._filmControllers.push(filmController);
      }

      if (section.className === `films-list--extra`) {
        this._extraFilmControllers.push(filmController);
      }

      filmController.render(film);
    }

    if (countFilms) {
      this._renderedFilmsAmount = document.querySelectorAll(`.films-list .film-card`).length;
    }

    if (this._renderedFilmsAmount < this._moviesModel.getFilmList().length) {
      this._renderShowMoreButton();
    }
  }

  render() {
    const filmSection = this._filmSectionComponent.getElement();
    const filmList = this._moviesModel.getFilmList();

    render(this._container, this._sortComponent);
    render(this._container, this._filmSectionComponent);

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      const filmsLoaded = this._renderedFilmsAmount;
      this._moviesModel.sortType = sortType;

      filmSection.querySelector(`.films-list__container`).innerHTML = ``;
      this.renderFilms(this._moviesModel.getFilmList().slice(0, filmsLoaded), filmSection);
    });

    if (filmList.length) {
      this.renderFilms(filmList.slice(0, Films.INITIAL_AMOUNT), filmSection);
      this._renderTopRated(filmList);
      this._renderMostCommented(filmList);
    } else {
      filmSection.replaceChild(this._noDataComponent.getElement(), filmSection.querySelector(`.films-list`));
    }
  }

  _renderTopRated(filmList) {
    const topRatedFilms = filmList.slice()
      .sort((a, b) => b.rating - a.rating).slice(0, Films.EXTRA_FILM_AMOUNT);

    if (topRatedFilms.some((film) => film.rating !== 0)) {
      const extraSection = new ExtraSectionComponent(`Top Rated`);
      render(this._filmSectionComponent.getElement(), extraSection);
      this.renderFilms(topRatedFilms, extraSection.getElement(), false);
    }
  }

  _renderMostCommented(filmList) {
    const mostCommentedFilms = filmList.slice()
      .sort((a, b) => b.comments.length - a.comments.length).slice(0, Films.EXTRA_FILM_AMOUNT);

    if (mostCommentedFilms.some((film) => film.comments.length !== 0)) {
      const extraSection = new ExtraSectionComponent(`Most Commented`);
      render(this._filmSectionComponent.getElement(), extraSection);
      this.renderFilms(mostCommentedFilms, extraSection.getElement(), false);
    }
  }

  _renderShowMoreButton() {
    if (document.querySelector(`.films-list__show-more`)) {
      return;
    }

    const filmSection = this._filmSectionComponent.getElement();
    render(filmSection.querySelector(`.films-list`), this._showMoreButtonComponent);

    this._showMoreButtonComponent.onButtonClick(() => {
      const filmsToLoad = this._moviesModel.getFilmList();
      const loadMoreAmount = this._renderedFilmsAmount + Films.LOAD_AMOUNT;

      this.renderFilms(filmsToLoad.slice(this._renderedFilmsAmount, loadMoreAmount), filmSection);

      if (loadMoreAmount >= filmsToLoad.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }

  _removeFilms() {
    this._filmControllers.forEach((it) => it.destroy());
    this._filmControllers = [];
  }

  _updateFilms() {
    const filmList = this._moviesModel.getFilmList();
    this._removeFilms();
    remove(this._showMoreButtonComponent);
    this._showMoreButtonComponent.removeElement();
    this.renderFilms(filmList.slice(0, Films.INITIAL_AMOUNT), this._filmSectionComponent.getElement());
  }

  _onDataChange(filmController, oldData, newData) {
    if (this._moviesModel.updateFilm(newData.id, newData)) {
      filmController.updateComponents(newData);
    }
  }

  _onFilterChange() {
    this._updateFilms();
  }
}
