import { fromJS, List, Map } from "immutable";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

let nextId = localStorage.getItem("nextId") || 0;
const _todos$ = new BehaviorSubject({
  todos: fromJS(JSON.parse(localStorage.getItem("todos")) || [])
});
const todos$ = _todos$.pipe(map(state => state));

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
    todos: _todos$.value.todos.filter(todo => !todo.complete)
  });
  updateLocalStorage();
};

export const onEditTodoText = (todoId, todoText) => {
  updateTodo(todoId, todo => todo.set("text", todoText));
};

export const onToggleComplete = todoId => {
  updateTodo(todoId, todo => todo.update("complete", complete => !complete));
};

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
