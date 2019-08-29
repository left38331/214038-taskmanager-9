import {render, Position, Sorting} from "../utils";
import Board from "../components/board";
import NoTask from "../components/no-task";
import SortFilter from "../components/sort-filter-container";
import TaskContainer from "../components/board-task-container";
import LoadMore from "../components/button-load-more";
import TaskController from "./task";

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
    this._subscriptions = [];

    this._countRenderTasks = this._countRenderTasks();
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }

  init() {
    render(this._container, this._board.getElement(), Position.BEFOREEND);
    if (this._firtsPartTasks.length === 0) {
      render(this._board.getElement(), this._noTasks.getElement(), Position.BEFOREEND);
    } else {
      render(this._board.getElement(), this._sort.getElement(), Position.BEFOREEND);
      render(this._board.getElement(), this._taskList.getElement(), Position.BEFOREEND);

      this._countRenderTasks.forEach((taskMock) => this._renderTask(this._taskList, taskMock));

      if (this._allTasks.length > 8) {
        this._renderLoadMore(this._taskList);
      }

      this._sort.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt, this._taskList));
    }
  }

  _renderBoard() {
    this._taskList.getElement().innerHTML = ``;
    this._countRenderTasks.forEach((taskMock) => this._renderTask(this._taskList, taskMock));
  }

  _renderTask(container, task) {
    const taskController = new TaskController(container, task, this._onDataChange, this._onChangeView);
    this._subscriptions.push(taskController.setDefaultView.bind(taskController));
  }

  _onChangeView() {
    this._subscriptions.forEach((subscription) => subscription());
  }

  _onDataChange(newData, oldData) {
    this._countRenderTasks[this._countRenderTasks.findIndex((it) => it === oldData)] = newData;
    this._renderBoard(this._countRenderTasks);
  }

  _countRenderTasks() {
    return this._firtsPartTasks;
  }

  _renderLoadMore(container) {
    const loadMore = new LoadMore();

    loadMore.getElement().addEventListener(`click`, () => {
      const newTasks = this.restTasks.splice(0, 8);

      this._countRenderTasks = this._countRenderTasks.concat(newTasks);
      newTasks.forEach((taskMock) => this._renderTask(container, taskMock));

      if (this.restTasks.length < 1) {
        loadMore.removeElement();
      }
    });

    render(this._board.getElement(), loadMore.getElement(), Position.BEFOREEND);
  }

  _onSortLinkClick(evt, container) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    this._taskList.getElement().innerHTML = ``;

    switch (evt.target.dataset.sort) {
      case Sorting.DATE_UP:
        this._countRenderTasks.slice().sort((a, b) => a.dueDate - b.dueDate).forEach((taskMock) => this._renderTask(container, taskMock));
        break;
      case Sorting.DATE_DOWN:
        this._countRenderTasks.slice().sort((a, b) => b.dueDate - a.dueDate).forEach((taskMock) => this._renderTask(container, taskMock));
        break;
      case Sorting.DEFAULT:
        this._countRenderTasks.forEach((taskMock) => this._renderTask(container, taskMock));
        break;
    }
  }
}
