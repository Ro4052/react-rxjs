import { List, Map } from "immutable";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import arrayMove from "array-move";

import * as todoStore from "./todoLocalStorage";
import { applyFilter } from "./todoFilter";

let nextId = todoStore.getNextId() || 0;
const _todos$ = new BehaviorSubject({
  todos: todoStore.getTodos()
});
const todos$ = _todos$.pipe(map(state => applyFilter(state)));

export const getTodoStream = () => todos$;

export const onReorderTodos = ({ oldIndex, newIndex }) => {
  const todos = arrayMove(_todos$.value.todos.toArray(), oldIndex, newIndex);
  _todos$.next({
    todos: List(todos)
  });
  todoStore.updateTodos(_todos$.value.todos);
};

export const onSubmitTodo = todoText => {
  _todos$.next({
    todos: List([
      ..._todos$.value.todos,
      Map({ id: nextId++, text: todoText, complete: false })
    ])
  });
  todoStore.updateNextId(nextId);
  todoStore.updateTodos(_todos$.value.todos);
};

export const onDeleteTodo = todoId => {
  _todos$.next({
    todos: _todos$.value.todos.filter(todo => todo.get("id") !== todoId)
  });
  todoStore.updateTodos(_todos$.value.todos);
};

export const onDeleteCompleted = () => {
  _todos$.next({
    todos: _todos$.value.todos.filter(todo => !todo.get("complete"))
  });
  todoStore.updateTodos(_todos$.value.todos);
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
  todoStore.updateTodos(_todos$.value.todos);
}
