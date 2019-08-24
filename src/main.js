import {allTaskConfig} from "./data";
import {allFilterConfig} from "./data";
import {Position} from "./utils";
import {render} from "./utils";
import Menu from "./components/site-menu";
import Filter from "./components/filter";
import FilterContainer from "./components/filter-container";
import Search from "./components/search";
import BoardController from "./controllers/board";

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

const renderMainComponents = () => {
  const mainContainer = document.querySelector(`.main`);
  const controlContainer = document.querySelector(`.main__control`);

  renderMenu(controlContainer);
  renderSearch(mainContainer);
  renderFilterContainer(mainContainer);

  const filterContainer = mainContainer.querySelector(`.main__filter`);

  allFilterConfig.forEach((filter) => renderFilters(filterContainer, filter));
};

renderMainComponents();

const mainContainer = document.querySelector(`.main`);
const boardController = new BoardController(mainContainer, allTaskConfig);

boardController.init();
