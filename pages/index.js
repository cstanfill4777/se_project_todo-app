import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import TodoCounter from "../components/TodoCounter.js";
import PopupWithForm from "../components/PopupWithForm.js";

let todos = [];

const counter = new TodoCounter(".counter__text");

const updateCounter = () => {
  const completed = todos.filter((t) => t.completed).length;
  counter.setInitialCounts(completed, todos.length);
};

const handleToggle = (id) => {
  const todo = todos.find((t) => t.id === id);
  if (!todo) return;
  todo.completed = !todo.completed;
  updateCounter();
};

const handleDelete = (id, todoElement) => {
  const deleted = todos.find((t) => t.id === id);
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

const getInitialTodos = () =>
  initialTodos.map((item) => ({ ...item, completed: false }));

const todoSection = new Section(
  {
    items: getInitialTodos(),
    renderer: renderTodo,
  },
  ".todos__list"
);

const addTodoForm = document.querySelector("#add-todo-form");
const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();

const popupWithForm = new PopupWithForm("#add-todo-popup", (formData) => {
  const name = formData.name.trim();
  const dateInput = formData.date;

  let date = null;
  if (dateInput) {
    date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  }

  const id = uuidv4();
  const newTodo = { name, date, id, completed: false };
  todos.push(newTodo);
  renderTodo(newTodo);
  updateCounter();
  newTodoValidator.resetValidation();
  popupWithForm.close();
});
popupWithForm.setEventListeners();

document
  .querySelector(".button_action_add")
  .addEventListener("click", () => popupWithForm.open());

todos = getInitialTodos();
todoSection.renderItems();
updateCounter();
