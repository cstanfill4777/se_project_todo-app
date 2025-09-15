import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import TodoCounter from "../components/TodoCounter.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const todosList = document.querySelector(".todos__list");
const counterElement = document.querySelector(".todos__counter");

let todos = [];

const counter = new TodoCounter(counterElement);

const updateCounter = () => {
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  counter.update(`${completed} / ${total}`);
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
  const todo = new Todo(data, "#todo-template", {
    handleDelete,
    handleToggle,
  });
  return todo.getView();
};

const todoSection = new Section(
  {
    items: initialTodos.map((item) => ({ ...item, completed: false })),
    renderer: (item) => {
      const todoElement = generateTodo(item);
      todoSection.addItem(todoElement);
      todos.push(item);
    },
  },
  ".todos__list"
);

todoSection.renderItems();

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();

const handleAddTodo = (formData) => {
  const name = formData.name.trim();
  const dateInput = formData.date;

  let date = null;
  if (dateInput) {
    date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  }

  const id = uuidv4();
  const values = { name, date, id, completed: false };
  todos.push(values);

  const todoElement = generateTodo(values);
  todoSection.addItem(todoElement);

  popup.close();
  newTodoValidator.resetValidation();
  updateCounter();
};

const popup = new PopupWithForm("#add-todo-popup", handleAddTodo);
popup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  popup.open();
});

updateCounter();
