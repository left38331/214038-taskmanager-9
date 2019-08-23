import {createElement} from "../utils";
import {unrender} from "../utils";

export default class Search {
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
    return `<section class="main__search search container">
              <input
                type="text"
                id="search__input"
                class="search__input"
                placeholder="START TYPING — SEARCH BY WORD, #HASHTAG OR DATE"
                value="#work"
              />
              <label class="visually-hidden" for="search__input">Поиск</label>
            </section>
    `;
  }
}
