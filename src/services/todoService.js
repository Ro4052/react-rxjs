import { fromJS, List, Map } from "immutable";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

const filterStates = Map({ all: 1, active: 2, completed: 3 });
let currentState = filterStates.get("all");

let nextId = localStorage.getItem("nextId") || 0;
const _todos$ = new BehaviorSubject({
  todos: fromJS(JSON.parse(localStorage.getItem("todos")) || [])
});
const todos$ = _todos$.pipe(map(state => applyFilter(state)));

const applyFilter = state => {
  switch (currentState) {
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
      console.error(`Unknown filter state: ${currentState}`);
      currentState = filterStates.get("all");
      return state;
    }
  }
};

export const getTodoStream = () => todos$;

export const onSubmitTodo = todoText => {
  _todos$.next({
    todos: List([
      ..._todos$.value.todos,
      Map({ id: nextId++, text: todoText, complete: false })
    ])
  });
  updateLocalStorage();
};

export const onDeleteTodo = todoId => {
  _todos$.next({
    todos: _todos$.value.todos.filter(todo => todo.get("id") !== todoId)
  });
  updateLocalStorage();
};

export const onDeleteCompleted = () => {
  _todos$.next({
    todos: _todos$.value.todos.filter(todo => !todo.get("complete"))
  });
  updateLocalStorage();
};

export const onEditTodoText = (todoId, todoText) => {
  updateTodo(todoId, todo => todo.set("text", todoText));
};

export const onToggleComplete = todoId => {
  updateTodo(todoId, todo => todo.update("complete", complete => !complete));
};

export const onChangeFilter = newState =>
  (currentState = filterStates.get(newState));

function updateTodo(todoId, callback) {
  const todos = _todos$.value.todos;
  const updatedTodos = todos.update(
    todos.findIndex(todo => todo.get("id") === todoId),
    callback
  );
  _todos$.next({ todos: updatedTodos });
  updateLocalStorage();
}

function updateLocalStorage() {
  localStorage.setItem("nextId", nextId);
  localStorage.setItem("todos", JSON.stringify(_todos$.value.todos.toJSON()));
}
