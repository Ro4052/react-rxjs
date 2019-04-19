import { fromJS } from "immutable";

export const getNextId = () => localStorage.getItem("nextId") || 0;

export const getStoredTodos = () =>
  fromJS(JSON.parse(localStorage.getItem("todos")) || []);

export const updateLocalStorage = (nextId, todos) => {
  localStorage.setItem("nextId", nextId);
  localStorage.setItem("todos", JSON.stringify(todos.toJSON()));
};
