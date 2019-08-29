import Task from "../components/card";
import TaskEdit from "../components/card-edit";
import {Position, render} from "../utils";

export default class TaskController {
  constructor(container, data, onDataChange, onChangeView) {
    this._container = container;
    this._data = data;
    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;
    this._taskView = new Task(data);
    this._taskEdit = new TaskEdit(data);

    this.init();
    this._changeStatusCard(`.card__btn--archive`);
    this._changeStatusCard(`.card__btn--favorites`);
    this._showOrHideDate();
    this._repeatDay();
    this._changeColorTask();
    this._addOrRemoveHashtag();
  }

  init() {
    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._container.getElement().replaceChild(this._taskView.getElement(), this._taskEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    this._taskView.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
      this._onChangeView();
      this._container.getElement().replaceChild(this._taskEdit.getElement(), this._taskView.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    this._taskEdit.getElement().querySelector(`textarea`).addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    this._taskEdit.getElement().querySelector(`textarea`).addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    this._taskEdit.getElement().querySelectorAll(`.card__btn`).forEach((btn) => {
      btn.addEventListener(`click`, () => btn.classList.toggle(`card__btn--disabled`));
    });

    this._taskEdit.getElement().querySelector(`.card__save`).addEventListener(`click`, (evt) => {
      evt.preventDefault();

      const formData = new FormData(this._taskEdit.getElement().querySelector(`.card__form`));
      const entry = {
        description: formData.get(`text`),
        color: formData.get(`color`),
        tags: new Set(formData.getAll(`hashtag`)),
        dueDate: formData.get(`date`),
        repeatingDays: formData.getAll(`repeat`).reduce((acc, it) => {
          acc[it] = true;
          return acc;
        }, {
          'mo': false,
          'tu': false,
          'we': false,
          'th': false,
          'fr': false,
          'sa': false,
          'su': false,
        }),
        isFavorite: !this._taskEdit.getElement().querySelector(`.card__btn--favorites`).classList.contains(`card__btn--disabled`),
        isArchive: !this._taskEdit.getElement().querySelector(`.card__btn--archive`).classList.contains(`card__btn--disabled`)
      };

      this._onDataChange(entry, this._data);
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    this._taskEdit.getElement().querySelector(`.card__delete`).addEventListener(`click`, () => {
      this._taskEdit.removeElement();
    });

    render(this._container.getElement(), this._taskView.getElement(), Position.BEFOREEND);
  }

  _changeStatusCard(element) {
    this._taskView.getElement().querySelector(element).addEventListener(`click`, (e) => {
      e.target.classList.toggle(`card__btn--disabled`);

      const entry = {
        description: this._data.description,
        color: this._data.color,
        tags: this._data.tags,
        dueDate: this._data.dueDate,
        repeatingDays: this._data.repeatingDays,
        isFavorite: !this._taskView.getElement().querySelector(`.card__btn--favorites`).classList.contains(`card__btn--disabled`),
        isArchive: !this._taskView.getElement().querySelector(`.card__btn--archive`).classList.contains(`card__btn--disabled`)
      };

      this._onDataChange(entry, this._data);
    });
  }

  _showOrHideDate() {
    this._taskEdit.getElement().querySelector(`.card__date-deadline-toggle`).addEventListener(`click`, () => {
      const dateStatus = this._taskEdit.getElement().querySelector(`.card__date-status`);
      const fieldDate = this._taskEdit.getElement().querySelector(`.card__date`);

      if (dateStatus.textContent === `yes`) {
        dateStatus.textContent = `no`;
        fieldDate.value = ``;
        fieldDate.style.display = `none`;
      } else {
        dateStatus.textContent = `yes`;
        fieldDate.style.display = `block`;
      }
    });
  }

  _repeatDay() {
    this._taskEdit.getElement().querySelector(`.card__repeat-toggle`).addEventListener(`click`, () => {
      const repeatStatus = this._taskEdit.getElement().querySelector(`.card__repeat-status`);
      const fieldRepeat = this._taskEdit.getElement().querySelector(`.card__repeat-days`);

      if (repeatStatus.textContent === `yes`) {
        repeatStatus.textContent = `no`;
        fieldRepeat.querySelectorAll(`.card__repeat-day-input`).forEach((input) => input.removeAttribute(`checked`));
        fieldRepeat.style.display = `none`;
        this._taskEdit.getElement().classList.remove(`card--repeat`);
      } else {
        repeatStatus.textContent = `yes`;
        fieldRepeat.style.display = `block`;
        this._taskEdit.getElement().classList.add(`card--repeat`);
      }
    });
  }

  _changeColorTask() {
    const allColorClassCards = [`card--black`, `card--yellow`, `card--blue`, `card--green`, `card--pink`];

    this._taskEdit.getElement().querySelectorAll(`.card__color-input`).forEach((input) => input.addEventListener(`click`, () => {
      allColorClassCards.forEach((it) => this._taskEdit.getElement().classList.remove(it));
      this._taskEdit.getElement().classList.add(`card--${input.value}`);
    }));
  }

  _addOrRemoveHashtag() {
    const hashtagList = this._taskEdit.getElement().querySelector(`.card__hashtag-list`);

    this._taskEdit.getElement().querySelector(`.card__hashtag-input`).addEventListener(`keydown`, (evt) => {
      if (evt.key === `Enter`) {
        evt.preventDefault();

        if (evt.target.value.length > 0) {
          hashtagList.insertAdjacentHTML(`beforeend`, `
          <span class="card__hashtag-inner">
            <input
              type="hidden"
              name="hashtag"
              value="${evt.target.value}"
              class="card__hashtag-hidden-input"
            />
            <p class="card__hashtag-name">
              #${evt.target.value}
            </p>
            <button type="button" class="card__hashtag-delete">
              delete
            </button>
          </span>`);
        }

        evt.target.value = ``;
        this._delHashtag();
      }
    });

    if (hashtagList.children.length !== 0) {
      this._delHashtag();
    }
  }

  _delHashtag() {
    const delBtnsHashtag = this._taskEdit.getElement().querySelectorAll(`.card__hashtag-delete`);

    delBtnsHashtag.forEach((btn) => btn.addEventListener(`click`, () => btn.closest(`.card__hashtag-inner`).remove()));
  }

  setDefaultView() {
    if (this._container.getElement().contains(this._taskEdit.getElement())) {
      this._container.getElement().replaceChild(this._taskView.getElement(), this._taskEdit.getElement());
    }
  }
}
