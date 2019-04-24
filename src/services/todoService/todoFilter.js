import { Map } from "immutable";

const filterStates = Map({ all: 1, active: 2, completed: 3 });

let currentFilter = filterStates.get("all");

export const applyFilter = state => {
  switch (currentFilter) {
    case filterStates.get("all"): {
      return state;
    }
    case filterStates.get("active"): {
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.get("complete"))
      };
    }
    case filterStates.get("completed"): {
      return {
        ...state,
        todos: state.todos.filter(todo => todo.get("complete"))
      };
    }
    default: {
      console.error(`Unknown filter state: ${currentFilter}`);
      currentFilter = filterStates.get("all");
      return state;
    }
  }
};

export const isFiltered = () => currentFilter !== filterStates.get("all");

export const changeFilter = newFilter =>
  (currentFilter = filterStates.get(newFilter));
