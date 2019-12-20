import {formatTime, formatDate} from "../utils/helpers";
import SmartComponent from "./smart-component";
import {remove, render} from "../utils/render";

export default class FilmDetails extends SmartComponent {
  constructor(film) {
    super();
    this._film = film;
    this._emojiLabel = null;
    this._subscribeOnEvents();
  }

  renderComments(comments) {
    const sortedComments = comments.slice()
      .sort((a, b) => a.date - b.date);

    return sortedComments.map((comment) =>
      `<li class="film-details__comment" data-id="${comment.id}">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${comment.emoji}" width="55" height="55" alt="emoji">
        </span>
        <div>
          <p class="film-details__comment-text">${comment.text}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${comment.author}</span>
            <span class="film-details__comment-day">${formatDate(comment.date)}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`).join(`\n`);
  }

  getFilmControlsTemplate() {
    const film = this._film;

    return `<section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${film.isInWatchlist ? `checked` : ``}>
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${film.isWatched ? `checked` : ``}>
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${film.isFavorite ? `checked` : ``}>
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>
        </div>`;
  }

  getMiddleContainerTemplate() {
    return `<div class="form-details__middle-container" ${!this._film.isWatched ? `hidden` : ``}>
    <section class="film-details__user-rating-wrap">
      <div class="film-details__user-rating-controls">
        <button class="film-details__watched-reset" type="button">Undo</button>
      </div>

      <div class="film-details__user-score">
        <div class="film-details__user-rating-poster">
          <img src="./images/posters/the-great-flamarion.jpg" alt="film-poster" class="film-details__user-rating-img">
        </div>

        <section class="film-details__user-rating-inner">
          <h3 class="film-details__user-rating-title">The Great Flamarion</h3>

          <p class="film-details__user-rating-feelings">How you feel it?</p>

          <div class="film-details__user-rating-score">
            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="1" id="rating-1">
            <label class="film-details__user-rating-label" for="rating-1">1</label>

            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="2" id="rating-2">
            <label class="film-details__user-rating-label" for="rating-2">2</label>

            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="3" id="rating-3">
            <label class="film-details__user-rating-label" for="rating-3">3</label>

            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="4" id="rating-4">
            <label class="film-details__user-rating-label" for="rating-4">4</label>

            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="5" id="rating-5">
            <label class="film-details__user-rating-label" for="rating-5">5</label>

            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="6" id="rating-6">
            <label class="film-details__user-rating-label" for="rating-6">6</label>

            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="7" id="rating-7">
            <label class="film-details__user-rating-label" for="rating-7">7</label>

            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="8" id="rating-8">
            <label class="film-details__user-rating-label" for="rating-8">8</label>

            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="9" id="rating-9" checked>
            <label class="film-details__user-rating-label" for="rating-9">9</label>

          </div>
        </section>
      </div>
    </section>
  </div>`;
  }

  getCommentsWrapTemplate() {
    const film = this._film;
    let emojiLabel = this._emojiLabel;

    if (emojiLabel) {
      emojiLabel.style.width = `55px`;
      emojiLabel.style.height = `55px`;
    }

    return `<section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${film.comments.length}</span></h3>

          <ul class="film-details__comments-list">
            ${this.renderComments(film.comments)}
          </ul>

          <div class="film-details__new-comment">
            <div for="add-emoji" class="film-details__add-emoji-label">
            ${emojiLabel ? emojiLabel.outerHTML : ``}
            </div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="neutral-face">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="grinning">
              <label class="film-details__emoji-label" for="emoji-gpuke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="grinning">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>`;
  }

  getTemplate() {
    const film = this._film;
    const duration = formatTime(film.duration);
    const genresMarkup = film.genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join(`\n`);

    return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./images/posters/${film.poster}" alt="">

            <p class="film-details__age">18+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${film.title}</h3>
                <p class="film-details__title-original">Original: ${film.title}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${film.rating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${film.director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${film.writers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${film.actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${film.date} ${film.year}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${duration}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${film.country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  ${genresMarkup}
              </tr>
            </table>

            <p class="film-details__film-description">
                 ${film.description}
            </p>
          </div>
        </div>

        ${this.getFilmControlsTemplate()}
        ${this.getMiddleContainerTemplate()}

      <div class="form-details__bottom-container">
        ${this.getCommentsWrapTemplate()}
      </div>
    </form>
  </section>`;
  }

  set film(newFilm) {
    this._film = newFilm;
  }

  show(container) {
    render(container, this);
    document.addEventListener(`keydown`, this._onKeydown);
  }

  hide() {
    remove(this);
    document.removeEventListener(`keydown`, this._onKeydown);
  }

  // Частичный перерендер для элементов компонента, обладающего анимацией,
  // чтобы не вызывать при вызове rerender() эту анимацию
  rerender() {
    this.getElement().querySelector(`.film-details__controls`).outerHTML = this.getFilmControlsTemplate();
    this.getElement().querySelector(`.form-details__middle-container`).outerHTML = this.getMiddleContainerTemplate();
    this.getElement().querySelector(`.film-details__comments-list`).innerHTML = this.renderComments(this._film.comments);
    this.getElement().querySelector(`.film-details__comments-wrap`).outerHTML = this.getCommentsWrapTemplate();

    this.recoverListeners();
  }

  onAddToWatchlistClick(handler) {
    this._onAddToWatchlistClick = handler;
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, handler);
  }

  onMarkAsWatchedClick(handler) {
    this._onMarkAsWatchedClick = handler;
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, handler);
  }

  onFavoriteClick(handler) {
    this._onFavoriteClick = handler;
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, handler);
  }

  onCommentDeleteClick(handler) {
    this._onCommentDeleteClick = handler;

    const deleteButtons = this.getElement().querySelectorAll(`.film-details__comment-delete`);
    deleteButtons.forEach((it) => it.addEventListener(`click`, handler));
  }

  onKeydown(handler) {
    this._onKeydown = handler;
  }

  recoverListeners() {
    this._subscribeOnEvents();
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, this._onAddToWatchlistClick);
    element.querySelector(`.film-details__control-label--watched`).addEventListener(`click`, this._onMarkAsWatchedClick);
    element.querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, this._onFavoriteClick);

    const deleteButtons = this.getElement().querySelectorAll(`.film-details__comment-delete`);

    if (deleteButtons) {
      deleteButtons.forEach((it) => it.addEventListener(`click`, this._onCommentDeleteClick));
    }

    const emojiLabels = this.getElement().querySelectorAll(`.film-details__emoji-label img`);

    emojiLabels.forEach((it) => it.addEventListener(`click`, (evt) => {
      this._emojiLabel = evt.target;

      this.rerender();
    }));

    element.querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
      this.hide();
    });
  }
}
