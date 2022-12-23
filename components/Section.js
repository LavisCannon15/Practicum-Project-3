export default class Section {
  constructor({ items, renderer }, selector) {
    this._renderer = renderer;
    this._element = document.querySelector(selector);
    this._items = items;
  }

  renderItems() {
    this._items.forEach(this._renderer);
  }

  addItems(element) {
    this._container.prepend(element);
  }
}
