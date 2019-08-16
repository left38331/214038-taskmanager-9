import {getMenuLayout} from "./components/site-menu";
import {getSearchLayout} from "./components/search";
import {getFilterContainerLayout} from "./components/filter-container";
import {getFilterLayout} from "./components/filter";
import {getBoardLayout} from "./components/board";
import {getAddCardLayout} from "./components/card-edit";
import {getCardLayout} from "./components/card";
import {getButtonLayout} from "./components/button-load-more";
import {allTaskConfig} from "./data";
import {allFilterConfig} from "./data";

const editTask = allTaskConfig.shift();
const firstPartTasks = allTaskConfig.splice(0, 7);

const renderComponent = (container, layout) => {
  container.insertAdjacentHTML(`beforeend`, layout);
};

const renderBoardContent = () => {
  const board = document.querySelector(`.board `);
  const tasksList = board.querySelector(`.board__tasks`);

  renderFirstPartTasks(tasksList);
  renderComponent(board, getButtonLayout());
};

const renderFirstPartTasks = (container) => {
  renderComponent(container, getAddCardLayout(editTask));
  renderComponent(container, firstPartTasks.map(getCardLayout).join(``));
};

const renderRestTask = (array, container, button) => {
  const newTasks = array.splice(0, 8);
  renderComponent(container, newTasks.splice(0, 8).map(getCardLayout).join(``));

  if (array.length < 1) {
    button.remove();
  }
};

const renderAllFilters = () => {
  const filterContainer = document.querySelector(`.main__filter`);

  renderComponent(filterContainer, allFilterConfig.map(getFilterLayout).join(``));
};

const renderAllComponents = () => {
  const mainContainer = document.querySelector(`.main`);
  const controlContainer = mainContainer.querySelector(`.main__control`);

  renderComponent(controlContainer, getMenuLayout());
  renderComponent(mainContainer, getSearchLayout());
  renderComponent(mainContainer, getFilterContainerLayout());
  renderComponent(mainContainer, getBoardLayout());
  renderBoardContent();
  renderAllFilters();
};

renderAllComponents();

const loadMoreButton = document.querySelector(`.load-more`);

loadMoreButton.addEventListener(`click`, function () {
  renderRestTask(allTaskConfig, document.querySelector(`.board__tasks`), loadMoreButton);
});
