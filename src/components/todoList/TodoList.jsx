import React from "react";
import { BehaviorSubject } from "rxjs";
import { List } from "semantic-ui-react";

import withObservableStream from "../withObservableStream/WithObservableStream";
import TextInput from "../textInput/TextInput";

const TodoList = ({ todos, onSubmitTodo }) => (
  <>
    <List bulleted>
      {todos && todos.map((todo, i) => <List.Item key={i}> {todo} </List.Item>)}
    </List>
    <TextInput
      action="Create"
      placeholder="Type here..."
      submit={onSubmitTodo}
    />
  </>
);

const todos$ = new BehaviorSubject({ todos: [] });

export default withObservableStream(todos$, {
  onSubmitTodo: todo => todos$.next({ todos: [...todos$.value.todos, todo] })
})(TodoList);
