import {getMenuLayout} from "./components/site-menu";
import {getSearchLayout} from "./components/search";
import {getFilterLayout} from "./components/filter";
import {getBoardLayout} from "./components/board";
import {getAddCardLayout} from "./components/card-add";
import {getCardLayout} from "./components/card";
import {getButtonLayout} from "./components/button-load-more";

const renderComponent = (container, layout) => {
  container.insertAdjacentHTML(`beforeend`, layout);
};

const renderBoardContent = () => {
  const board = document.querySelector(`.board `);
  const tasksList = board.querySelector(`.board__tasks`);

  renderComponent(tasksList, getAddCardLayout());
  renderComponent(tasksList, getCardLayout());
  renderComponent(tasksList, getCardLayout());
  renderComponent(tasksList, getCardLayout());
  renderComponent(board, getButtonLayout());
};

const renderAllComponents = () => {
  const mainContainer = document.querySelector(`.main`);
  const controlContainer = mainContainer.querySelector(`.main__control`);

  renderComponent(controlContainer, getMenuLayout());
  renderComponent(mainContainer, getSearchLayout());
  renderComponent(mainContainer, getFilterLayout());
  renderComponent(mainContainer, getBoardLayout());
  renderBoardContent();
};

renderAllComponents();
