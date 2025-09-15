export default class Todo {
  constructor(
    { name, date, id, isCompleted = false },
    selector,
    { handleToggle, handleDelete }
  ) {
    this._name = name;
    this._date = date;
    this._id = id;
    this._isCompleted = isCompleted;
    this._selector = selector;
    this._handleToggle = handleToggle;
    this._handleDelete = handleDelete;
  }

  _getTemplate() {
    const todoTemplate = document
      .querySelector(this._selector)
      .content.querySelector(".todo")
      .cloneNode(true);

    return todoTemplate;
  }

  _setEventListeners() {
    this._checkbox.addEventListener("change", () => {
      this._isCompleted = this._checkbox.checked;
      this._updateVisualState();
      this._handleToggle(this._id, this._isCompleted);
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDelete(this._id);
    });
  }

  _updateVisualState() {
    if (this._isCompleted) {
      this._text.classList.add("todo__text_checked");
    } else {
      this._text.classList.remove("todo__text_checked");
    }
  }

  getView() {
    this._element = this._getTemplate();

    this._checkbox = this._element.querySelector(".todo__checkbox");
    this._text = this._element.querySelector(".todo__text");
    this._dateEl = this._element.querySelector(".todo__date");
    this._deleteButton = this._element.querySelector(".todo__delete-button");

    this._text.textContent = this._name;
    this._checkbox.checked = this._isCompleted;
    this._updateVisualState();

    if (this._date && this._dateEl) {
      const displayDate = new Date(this._date);
      this._dateEl.textContent = displayDate.toLocaleDateString();
    }

    this._setEventListeners();

    return this._element;
  }
}
