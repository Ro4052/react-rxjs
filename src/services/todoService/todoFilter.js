import { getFilterState, updateFilterState } from "./todoLocalStorage";

const filterStates = { all: "all", active: "active", completed: "completed" };

const savedState = getFilterState();
let currentFilter = savedState ? savedState : filterStates.all;

export const applyFilter = state => {
  switch (currentFilter) {
    case filterStates.all: {
      return state;
    }
    case filterStates.active: {
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.get("complete"))
      };
    }
    case filterStates.completed: {
      return {
        ...state,
        todos: state.todos.filter(todo => todo.get("complete"))
      };
    }
    default: {
      console.error(`Unknown filter state: ${currentFilter}`);
      changeFilter(filterStates.all);
      return state;
    }
  }
};

export const isFiltered = () => currentFilter !== filterStates.all;

export const getCurrentFilter = () => currentFilter;

export const changeFilter = newFilter => {
  currentFilter = newFilter;
  updateFilterState(currentFilter);
};
