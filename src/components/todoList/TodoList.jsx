import React from "react";
import { List } from "semantic-ui-react";

import withObservableStream from "../withObservableStream/WithObservableStream";
import * as todoService from "../../services/todoService";
import TextInput from "../textInput/TextInput";

const TodoList = ({ todos, onSubmitTodo }) => (
  <>
    <List bulleted>
      {todos &&
        todos.map((todo, i) => (
          <List.Item key={todo.id}> {todo.text} </List.Item>
        ))}
    </List>
    <TextInput
      action="Create"
      placeholder="Type here..."
      submit={onSubmitTodo}
    />
  </>
);

export default withObservableStream(todoService.getTodoStream(), {
  onSubmitTodo: todoService.onTodoSubmit
})(TodoList);
