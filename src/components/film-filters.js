const renderFilters = (filters) => {
  return filters.map((filter) =>
    `<a href="#watchlist" class="main-navigation__item">${filter.title} <span class="main-navigation__item-count">${filter.count}</span></a>`
  ).join(`\n`);
};

export const createFilmFiltersTemplate = (filters) =>
  `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    ${renderFilters(filters)}
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
  </nav>

  <ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>`;
