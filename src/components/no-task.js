import {createElement} from "../utils";
import {unrender} from "../utils";

export default class NoTask {
  constructor() {
    this._elemen = null;
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
    return `<p class="board__no-tasks">
          Congratulations, all tasks were completed! To create a new click on
          «add new task» button.
        </p>`;
  }
}
