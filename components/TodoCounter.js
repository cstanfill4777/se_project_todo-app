export default class TodoCounter {
  constructor(counterSelector) {
    this._counterElement = document.querySelector(counterSelector);
    this._completed = 0;
    this._total = 0;
  }

  updateCompleted(increment) {
    this._completed += increment ? 1 : -1;
    this._updateDisplay();
  }

  updateTotal(increment) {
    this._total += increment ? 1 : -1;
    this._updateDisplay();
  }

  _updateDisplay() {
    this._counterElement.textContent = `${this._completed} of ${this._total} completed`;
  }

  setInitialCounts(completed, total) {
    this._completed = completed;
    this._total = total;
    this._updateDisplay();
  }
}
