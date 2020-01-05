export default class Store {
  constructor(storage) {
    this._storeKey = `cinemaddict-localstorage`;
    this._storage = storage;
  }

  getData() {
    try {
      return JSON.parse(this._storage.getItem(this._storeKey));
    } catch (err) {
      return {};
    }
  }

  setItem(key, value) {
    const store = this.getData();

    this._storage.setItem(
        this._storeKey,
        JSON.stringify(Object.assign({}, store, {[key]: value}))
    );
  }
}
