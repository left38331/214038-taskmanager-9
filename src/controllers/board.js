import {render, Position, Sorting} from "../utils";
import Board from "../components/board";
import NoTask from "../components/no-task";
import SortFilter from "../components/sort-filter-container";
import TaskContainer from "../components/board-task-container";
import Task from "../components/card";
import TaskEdit from "../components/card-edit";
import LoadMore from "../components/button-load-more";

export default class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._allTasks = tasks.slice();
    this._firtsPartTasks = tasks.splice(0, 8);
    this.restTasks = tasks;
    this._noTasks = new NoTask();
    this._board = new Board();
    this._sort = new SortFilter();
    this._taskList = new TaskContainer();
  }

  init() {
    render(this._container, this._board.getElement(), Position.BEFOREEND);
    if (this._firtsPartTasks.length === 0) {
      render(this._board.getElement(), this._noTasks.getElement(), Position.BEFOREEND);
    } else {
      render(this._board.getElement(), this._sort.getElement(), Position.BEFOREEND);
      render(this._board.getElement(), this._taskList.getElement(), Position.BEFOREEND);

      this._firtsPartTasks.forEach((taskMock) => this._renderTask(taskMock));

      if (this._allTasks.length > 8) {
        this._renderLoadMore();
      }

      this._sort.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
    }
  }

  _renderTask(task) {
    const taskComponent = new Task(task);
    const taskEdit = new TaskEdit(task);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._taskList.getElement().replaceChild(taskComponent.getElement(), taskEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    taskComponent.getElement()
      .querySelector(`.card__btn--edit`)
      .addEventListener(`click`, () => {
        this._taskList.getElement().replaceChild(taskEdit.getElement(), taskComponent.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    taskEdit.getElement().querySelector(`textarea`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    taskEdit.getElement().querySelector(`textarea`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    taskEdit.getElement()
      .querySelector(`.card__form`)
      .addEventListener(`submit`, () => {
        this._taskList.getElement().replaceChild(task.getElement(), taskEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    taskEdit.getElement()
      .querySelector(`.card__delete`)
      .addEventListener(`click`, () => {
        taskEdit.removeElement();
      });

    render(this._taskList.getElement(), taskComponent.getElement(), Position.BEFOREEND);
  }

  _renderLoadMore() {
    const loadMore = new LoadMore();

    loadMore.getElement().addEventListener(`click`, () => {
      const newTasks = this.restTasks.splice(0, 8);

      newTasks.forEach((taskMock) => this._renderTask(taskMock));

      if (this.restTasks.length < 1) {
        loadMore.removeElement();
      }
    });

    render(this._board.getElement(), loadMore.getElement(), Position.BEFOREEND);
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    this._taskList.getElement().innerHTML = ``;

    switch (evt.target.dataset.sort) {
      case Sorting.DATE_UP:
        this._firtsPartTasks.slice().sort((a, b) => a.dueDate - b.dueDate).forEach((taskMock) => this._renderTask(taskMock));
        break;
      case Sorting.DATE_DOWN:
        this._firtsPartTasks.slice().sort((a, b) => b.dueDate - a.dueDate).forEach((taskMock) => this._renderTask(taskMock));
        break;
      case Sorting.DEFAULT:
        this._firtsPartTasks.forEach((taskMock) => this._renderTask(taskMock));
        break;
    }
  }
}
