export default class TodoCounter {
  constructor(counterElement) {
    this._counterElement = counterElement;
  }

  update(todos) {
    const total = todos.length;
    const completed = todos.filter((todo) => todo.isCompleted).length;
    this._counterElement.textContent = `${completed} / ${total}`;
  }
}
