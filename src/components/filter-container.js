import {createElement} from "../utils";
import {unrender} from "../utils";

class FilterContainer {
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
    return `<section class="main__filter filter container">`;
  }
}

export {FilterContainer};

