# Simple Todo App

A minimal and accessible to-do list web application that allows users to manage tasks with ease. Users can add tasks with optional due dates, mark tasks as completed, and remove them when done. The app is lightweight, responsive, and designed with clean UI components.

## Functionality

This app provides the following core features:

- View a list of todos, each displaying:

  - A task name (required)
  - An optional due date
  - A completion checkbox
  - A delete button

- Add new todos using a popup modal:

  - Includes input validation for task name (2–40 characters)
  - Optional due date selection
  - Auto-generates unique IDs using UUID

- Interact with todos directly:

  - Mark them as completed or uncompleted
  - Delete tasks from the list

- Form input is validated using a custom `FormValidator` class with clear error messaging.

## Technology

This project was built using the following technologies and techniques:

- **HTML5**: Semantic structure and accessibility considerations.
- **CSS3**: Modular BEM methodology, responsive design, and theming.
- **JavaScript (ES6+)**:
  - Modular architecture using ES6 `import/export`
  - `Todo` class to encapsulate behavior of individual task items
  - `FormValidator` class for custom client-side validation
  - `uuid` library for generating unique identifiers
- **GitHub Pages**: Intended as a lightweight deployment target.

Project structure emphasizes modularity, accessibility, and maintainability, with components for forms, buttons, and templates all split into dedicated files.

## Deployment

This project is deployed on GitHub Pages:

- ADD LINK HERE
