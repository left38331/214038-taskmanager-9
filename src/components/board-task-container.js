import {createElement} from "../utils";
import {unrender} from "../utils";

export default class TaskContainer {
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
    return `<div class="board__tasks">
            </div>`;
  }
}
