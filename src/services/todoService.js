import { BehaviorSubject } from "rxjs";

const todos$ = new BehaviorSubject({ todos: [] });

export const getTodoStream = () => todos$;

export const onTodoSubmit = todo =>
  todos$.next({ todos: [...todos$.value.todos, todo] });
