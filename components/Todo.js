export default class Todo {
  constructor(data, templateSelector, handleToggle) {
    this._text = data.text;
    this._completed = data.completed;
    this._templateSelector = templateSelector;
    this._handleToggle = handleToggle;
  }

  _getTemplate() {
    const todoTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".todo")
      .cloneNode(true);

    return todoTemplate;
  }

  _setEventListeners() {
    this._checkbox.addEventListener("change", () => {
      this._handleToggle(this);
    });
  }

  toggleCompletion() {
    this._completed = !this._completed;
    this._checkbox.checked = this._completed;

    if (this._completed) {
      this._textElement.classList.add("todo__text_completed");
    } else {
      this._textElement.classList.remove("todo__text_completed");
    }
  }

  generate() {
    this._element = this._getTemplate();
    this._checkbox = this._element.querySelector(".todo__checkbox");
    this._textElement = this._element.querySelector(".todo__text");

    this._checkbox.checked = this._completed;
    this._textElement.textContent = this._text;

    if (this._completed) {
      this._textElement.classList.add("todo__text_completed");
    }

    this._setEventListeners();

    return this._element;
  }
}
