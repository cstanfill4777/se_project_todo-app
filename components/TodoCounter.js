export default class TodoCounter {
  constructor(counterSelector) {
    this._counterElement = document.querySelector(counterSelector);
  }

  update(todos) {
    const total = todos.length;
    const completed = todos.filter((todo) => todo.completed).length;
    this._counterElement.textContent = `${completed} of ${total} completed`;
  }
}
