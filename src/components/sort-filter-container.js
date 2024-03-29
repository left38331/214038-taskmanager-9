import AbstractComponent from "./absctract-component";

export default class SortFilter extends AbstractComponent {
  getTemplate() {
    return `<div class="board__filter-list">
              <a href="#" class="board__filter" data-sort="default">SORT BY DEFAULT</a>
              <a href="#" class="board__filter" data-sort="date-up">SORT BY DATE up</a>
              <a href="#" class="board__filter" data-sort="date-down">SORT BY DATE down</a>
            </div>`;
  }
}
