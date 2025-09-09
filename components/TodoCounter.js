export default class TodoCounter {
  constructor(counterElement, listElement) {
    this._counterElement = counterElement;
    this._listElement = listElement;
  }

  update() {
    const todos = this._listElement.querySelectorAll(".todo");
    this._counterElement.textContent = todos.length;
  }
}
