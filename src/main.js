import {createFilmCardTemplate} from './components/film-card.js';
import {createFilmDetailsTemplate} from './components/film-details.js';
import {createFilmFiltersTemplate} from './components/film-filters.js';
import {createFilmSectionTemplate} from './components/film-section.js';
import {createShowMoreBtnTemplate} from './components/show-more-btn.js';
import {createProfileRatingTemplate} from './components/profile-rating.js';

const FILM_AMOUNT = 5;
const EXTRA_FILM_AMOUNT = 2;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const mainContainer = document.querySelector(`.main`);
const headerContainer = document.querySelector(`.header`);
const footerContainer = document.querySelector(`.footer`);

render(headerContainer, createProfileRatingTemplate());
render(mainContainer, createFilmFiltersTemplate());
render(mainContainer, createFilmSectionTemplate());
render(footerContainer, createFilmDetailsTemplate(), `afterend`);

const filmListContainer = mainContainer.querySelector(`.films-list`);

for (let i = 0; i < FILM_AMOUNT; i++) {
  render(filmListContainer.querySelector(`.films-list__container`), createFilmCardTemplate());
}

render(filmListContainer, createShowMoreBtnTemplate());

const filmListExtraContainers = mainContainer.querySelectorAll(`.films-list--extra`);

filmListExtraContainers.forEach((el) => {
  for (let i = 0; i < EXTRA_FILM_AMOUNT; i++) {
    render(el.querySelector(`.films-list__container`), createFilmCardTemplate());
  }
});
