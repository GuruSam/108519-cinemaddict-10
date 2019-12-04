import {createElement} from "../utils";

const ratings = [
  {
    title: `Novice`,
    min: 0,
    max: 9
  },
  {
    title: `Fan`,
    min: 10,
    max: 19
  },
  {
    title: `Movie Buff`,
    min: 20,
    max: 30
  }
];

const getUserRating = (moviesWatched) => {
  let userRating;

  for (const rate of ratings) {
    if (moviesWatched >= rate.min && moviesWatched <= rate.max) {
      userRating = rate.title;
      break;
    }
  }

  return userRating;
};

const createProfileRatingTemplate = (movies) =>
  `<section class="header__profile profile">
    <p class="profile__rating">${getUserRating(movies)}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;

export default class ProfileRating {
  constructor(moviesWatchedAmount) {
    this._moviesWatched = moviesWatchedAmount;
    this._element = null;
  }

  getTemplate() {
    return createProfileRatingTemplate(this._moviesWatched);
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
