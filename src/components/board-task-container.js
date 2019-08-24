import AbstractComponent from "./absctract-component";

export default class TaskContainer extends AbstractComponent {
  getTemplate() {
    return `<div class="board__tasks"></div>`;
  }
}
