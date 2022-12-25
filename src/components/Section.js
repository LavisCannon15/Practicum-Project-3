export default class Section {
  constructor({ items, renderer }, selector) {
    this._renderer = renderer;
    this._element = document.querySelector(selector);
    this._items = items;
  }

  renderItems() {
    this._items.forEach((item) => this._renderer(item));
  }

  addItems(element) {
    this._element.prepend(element);
  }
}
