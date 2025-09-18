import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");

let todos = [];

const counter = new TodoCounter(".counter__text");

const handleEscClose = (evt) => {
  if (evt.key === "Escape") {
    closeModal(addTodoPopup);
  }
};

const openModal = (modal) => {
  modal.classList.add("popup_visible");
  document.addEventListener("keydown", handleEscClose);
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
  document.removeEventListener("keydown", handleEscClose);
};

const updateCounter = () => {
  counter.update(todos);
};

const handleToggle = (id) => {
  const todo = todos.find((t) => t.id === id);
  if (!todo) return;
  todo.completed = !todo.completed;
  updateCounter();
};

const handleDelete = (id, todoElement) => {
  todos = todos.filter((t) => t.id !== id);
  todoElement.remove();
  updateCounter();
};

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleToggle, handleDelete);
  return todo.getView();
};

const renderTodo = (item) => {
  const todoElement = generateTodo(item);
  todoSection.addItem(todoElement);
};

const getInitialTodos = () => {
  return initialTodos.map((item) => ({ ...item, completed: false }));
};

const todoSection = new Section(
  {
    items: getInitialTodos(),
    renderer: renderTodo,
  },
  ".todos__list"
);

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value.trim();
  const dateInput = evt.target.date.value;

  let date = null;
  if (dateInput) {
    date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  }

  const id = uuidv4();
  const values = { name, date, id, completed: false };
  todos.push(values);
  renderTodo(values);
  closeModal(addTodoPopup);
  newTodoValidator.resetValidation();
  updateCounter();
});

todos = getInitialTodos();
todoSection.renderItems();
updateCounter();
