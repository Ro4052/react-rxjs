import React from "react";
import { List, Icon } from "semantic-ui-react";

import withObservableStream from "../withObservableStream/WithObservableStream";
import * as todoService from "../../services/todoService";
import TodoItem from "./todoItem/TodoItem";
import TextInput from "../textInput/TextInput";
import styles from "./TodoList.module.css";

const TodoList = props => (
  <>
    <List divided relaxed className={styles.list}>
      {props.todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          delete={props.onDeleteTodo}
          toggleComplete={() => props.onToggleComplete(todo.id)}
        />
      ))}
      {props.todos.filter(todo => todo.complete).length > 0 && (
        <List.Item>
          <Icon
            link
            className={styles.deleteCompleted}
            name="trash alternate"
            color="red"
            onClick={props.onDeleteCompleted}
          />
        </List.Item>
      )}
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
  onToggleComplete: todoService.onToggleComplete,
  onDeleteCompleted: todoService.onDeleteCompleted
})(TodoList);
