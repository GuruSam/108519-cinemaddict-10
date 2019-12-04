import {createElement} from "../utils";

const renderFilters = (filters) => {
  return filters.map((filter) =>
    `<a href="#watchlist" class="main-navigation__item">${filter.title} <span class="main-navigation__item-count">${filter.count}</span></a>`
  ).join(`\n`);
};

const createFilmFiltersTemplate = (filters) =>
  `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    ${renderFilters(filters)}
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
  </nav>`;

export default class Filter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createFilmFiltersTemplate(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
