import Movie from "../models/movie";

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getMovies() {
    if (this._isOnline()) {
      return this._api.getMovies()
        .then((movies) => {
          movies.forEach((movie) => this._store.setItem(movie.id, Movie.toRAW(movie)));
          return movies;
        });
    } else {
      const data = this._store.getData();

      return Promise.resolve(Movie.parseMovieList(Object.values(data)));
    }
  }

  getComments(id) {
    if (this._isOnline()) {
      return this._api.getComments(id)
        .then((comments) => {
          const [film] = Object.values(this._store.getData())
            .filter((it) => it.id === id);
          film.commentsList = comments;
          this._store.setItem(id, film);
          return comments;
        });
    }
    const [film] = Object.values(this._store.getData())
      .filter((it) => it.id === id);

    return Promise.resolve(film.commentsList ? film.commentsList : null);
  }

  updateMovie(id, newData) {
    if (this._isOnline()) {
      return this._api.updateMovie(id, newData);
    }
  }

  createComment(id, data) {
    if (this._isOnline()) {
      return this._api.createComment(id, data);
    }
  }

  deleteComment(id) {
    if (this._isOnline()) {
      return this._api.deleteComment(id);
    }
  }

  _isOnline() {
    return window.navigator.onLine;
  }
}
