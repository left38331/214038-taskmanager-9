import AbstractComponent from "./absctract-component";

export default class FilterContainer extends AbstractComponent {
  getTemplate() {
    return `<section class="main__filter filter container">`;
  }
}
