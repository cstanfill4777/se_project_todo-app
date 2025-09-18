export default class Todo {
  constructor(
    { name, date, id, completed },
    templateSelector,
    handleToggle,
    handleDelete
  ) {
    this._name = name;
    this._date = date;
    this._id = id;
    this._completed = completed;

    this._templateSelector = templateSelector;
    this._handleToggle = handleToggle;
    this._handleDelete = handleDelete;
  }

  _getTemplate() {
    const template = document
      .querySelector(this._templateSelector)
      .content.querySelector(".todo")
      .cloneNode(true);
    return template;
  }

  getView() {
    this._element = this._getTemplate();

    this._checkbox = this._element.querySelector(".todo__completed");
    this._textElement = this._element.querySelector(".todo__name");
    this._dateElement = this._element.querySelector(".todo__date");
    this._deleteBtn = this._element.querySelector(".todo__delete-btn");

    this._textElement.textContent = this._name;
    if (this._date) {
      const date = new Date(this._date);
      this._dateElement.textContent = date.toLocaleDateString();
    } else {
      this._dateElement.textContent = "";
    }

    this._checkbox.checked = this._completed;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._checkbox.addEventListener("change", () => {
      this._handleToggle(this._id);
    });

    this._deleteBtn.addEventListener("click", () => {
      this._handleDelete(this._id, this._element);
    });
  }
}
