import { BehaviorSubject } from "rxjs";

let nextId = 0;
const todos$ = new BehaviorSubject({ todos: [] });

export const getTodoStream = () => todos$;

export const onSubmitTodo = todoText =>
  todos$.next({
    todos: [...todos$.value.todos, { id: nextId++, text: todoText }]
  });

export const onDeleteTodo = todoId => {
  todos$.next({
    todos: todos$.value.todos.filter(todo => todo.id !== todoId)
  });
};
