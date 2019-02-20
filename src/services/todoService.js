import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

let nextId = localStorage.getItem("nextId") || 0;
const _todos$ = new BehaviorSubject({
  todos: JSON.parse(localStorage.getItem("todos"))
});
const todos$ = _todos$.pipe(map(state => Object.freeze(state)));

export const getTodoStream = () => todos$;

export const onSubmitTodo = todoText => {
  _todos$.next({
    todos: [
      ..._todos$.value.todos,
      { id: nextId++, text: todoText, complete: false }
    ]
  });
  updateLocalStorage();
};

export const onDeleteTodo = todoId => {
  _todos$.next({
    todos: _todos$.value.todos.filter(todo => todo.id !== todoId)
  });
  updateLocalStorage();
};

export const onDeleteCompleted = () => {
  _todos$.next({
    todos: _todos$.value.todos.filter(todo => !todo.complete)
  });
  updateLocalStorage();
};

export const onEditTodoText = (todoId, todoText) => {
  updateTodo(todoId, todo => (todo.text = todoText));
};

export const onToggleComplete = todoId => {
  updateTodo(todoId, todo => (todo.complete = !todo.complete));
};

function updateTodo(todoId, callback) {
  const todos = [..._todos$.value.todos];
  const toggleTodo = todos.find(todo => todo.id === todoId);
  callback(toggleTodo);
  _todos$.next({ todos: todos });
  updateLocalStorage();
}

function updateLocalStorage() {
  localStorage.setItem("nextId", nextId);
  localStorage.setItem("todos", JSON.stringify(_todos$.value.todos));
}
