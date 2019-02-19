import React from "react";
import { List } from "semantic-ui-react";

import withObservableStream from "../withObservableStream/WithObservableStream";
import * as todoService from "../../services/todoService";
import TodoItem from "./todoItem/TodoItem";
import TextInput from "../textInput/TextInput";

const TodoList = props => (
  <>
    <List relaxed>
      {props.todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          delete={props.onDeleteTodo}
          toggleComplete={() => props.onToggleComplete(todo.id)}
        />
      ))}
    </List>
    <TextInput
      action="Create"
      placeholder="Type here..."
      submit={props.onSubmitTodo}
    />
  </>
);

export default withObservableStream(todoService.getTodoStream(), {
  onSubmitTodo: todoService.onSubmitTodo,
  onDeleteTodo: todoService.onDeleteTodo,
  onToggleComplete: todoService.onToggleComplete
})(TodoList);
