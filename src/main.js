import {allTaskConfig} from "./data";
import {allFilterConfig} from "./data";
import {Position} from "./utils";
import {render} from "./utils";
import {Menu} from "./components/site-menu";
import {Filter} from "./components/filter";
import {Board} from "./components/board";
import {FilterContainer} from "./components/filter-container";
import {Task} from "./components/card";
import {TaskEdit} from "./components/card-edit";
import {LoadMore} from "./components/button-load-more";
import {Search} from "./components/search";

const renderMenu = (container) => {
  const menu = new Menu();

  render(container, menu.getElement(), Position.BEFOREEND);
};

const renderSearch = (container) => {
  const search = new Search();

  render(container, search.getElement(), Position.BEFOREEND);
};

const renderFilterContainer = (container) => {
  const filterContainer = new FilterContainer();

  render(container, filterContainer.getElement(), Position.BEFOREEND);
};

const renderFilters = (container, filter) => {
  const oneFilter = new Filter(filter);

  render(container, oneFilter.getElement(), Position.BEFOREEND);
};

const renderBoard = (container) => {
  const board = new Board();

  render(container, board.getElement(), Position.BEFOREEND);
};

const renderTask = (container, taskMock) => {
  const task = new Task(taskMock);
  const taskEdit = new TaskEdit(taskMock);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      container.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  task.getElement()
    .querySelector(`.card__btn--edit`)
    .addEventListener(`click`, () => {
      container.replaceChild(taskEdit.getElement(), task.getElement());
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
      container.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  taskEdit.getElement()
    .querySelector(`.card__delete`)
    .addEventListener(`click`, () => {
      taskEdit.removeElement();
    });

  render(container, task.getElement(), Position.BEFOREEND);
};

const renderLoadMore = (container, tasksList) => {
  const loadMore = new LoadMore();

  loadMore.getElement().addEventListener(`click`, function () {
    const newTasks = allTaskConfig.splice(0, 8);

    newTasks.forEach((taskMock) => renderTask(tasksList, taskMock));

    if (allTaskConfig.length < 1) {
      loadMore.removeElement();
    }
  });

  render(container, loadMore.getElement(), Position.BEFOREEND);
};

const renderAllComponents = () => {
  const firstPartTasks = allTaskConfig.splice(0, 8);
  const mainContainer = document.querySelector(`.main`);
  const controlContainer = document.querySelector(`.main__control`);

  renderMenu(controlContainer);
  renderSearch(mainContainer);
  renderFilterContainer(mainContainer);

  const filterContainer = mainContainer.querySelector(`.main__filter`);

  allFilterConfig.forEach((filter) => renderFilters(filterContainer, filter));

  renderBoard(mainContainer);

  const boardContainer = mainContainer.querySelector(`.board `);
  const tasksList = mainContainer.querySelector(`.board__tasks`);

  firstPartTasks.forEach((taskMock) => renderTask(tasksList, taskMock));
  renderLoadMore(boardContainer, tasksList);
};

renderAllComponents();
