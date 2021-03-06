import { fromJS } from "immutable";

export const getNextId = () => localStorage.getItem("nextId") || 0;

export const getTodos = () =>
  fromJS(JSON.parse(localStorage.getItem("todos")) || []);

export const getFilterState = () => localStorage.getItem("filterState");

export const updateNextId = nextId => localStorage.setItem("nextId", nextId);

export const updateTodos = todos =>
  localStorage.setItem("todos", JSON.stringify(todos.toJSON()));

export const updateFilterState = state =>
  localStorage.setItem("filterState", state);
