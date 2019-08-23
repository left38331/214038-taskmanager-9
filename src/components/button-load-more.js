import {createElement} from "../utils";
import {unrender} from "../utils";

export default class LoadMore {
  constructor() {
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate(), `firstElement`);
    }

    return this._element;
  }

  removeElement() {
    unrender(this._element);
    this._element = null;
  }

  getTemplate() {
    return `<button class="load-more" type="button">load more</button>`;
  }
}
