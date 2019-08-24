import AbstractComponent from "./absctract-component";
import {createElement} from "../utils";

export default class Filter extends AbstractComponent {
  constructor({title, count}) {
    super();
    this._title = title;
    this._count = count;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate(), `divWrap`);
    }

    return this._element;
  }

  getTemplate() {
    return `<input
              type="radio"
              id="filter__${this._title}"
              class="filter__input visually-hidden"
              name="filter"
              ${this._count === 0 ? `disabled` : ``}
            />
            <label for="filter__${this._title}" class="filter__label">
              ${this._title} <span class="filter__${this._title}-count">${this._count}</span>
            </label>
          `;
  }
}
