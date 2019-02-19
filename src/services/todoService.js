import { BehaviorSubject } from "rxjs";

let nextId = localStorage.getItem("nextId") || 0;
const todos$ = new BehaviorSubject({
  todos: JSON.parse(localStorage.getItem("todos")) || []
});

export const getTodoStream = () => todos$;

export const onSubmitTodo = todoText => {
  todos$.next({
    todos: [
      ...todos$.value.todos,
      { id: nextId++, text: todoText, complete: false }
    ]
  });
  updateLocalStorage();
};

export const onDeleteTodo = todoId => {
  todos$.next({
    todos: todos$.value.todos.filter(todo => todo.id !== todoId)
  });
  updateLocalStorage();
};

export const onToggleComplete = todoId => {
  const todos = [...todos$.value.todos];
  const toggleTodo = todos.find(todo => todo.id === todoId);
  toggleTodo.complete = !toggleTodo.complete;
  todos$.next({ todos: todos });
  updateLocalStorage();
};

function updateLocalStorage() {
  localStorage.setItem("nextId", nextId);
  localStorage.setItem("todos", JSON.stringify(todos$.value.todos));
}