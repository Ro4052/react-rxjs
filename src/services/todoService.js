import { BehaviorSubject } from "rxjs";

let nextId = 0;
const todos$ = new BehaviorSubject({ todos: [] });

export const getTodoStream = () => todos$;

export const onTodoSubmit = todoText =>
  todos$.next({
    todos: [...todos$.value.todos, { id: nextId++, text: todoText }]
  });
