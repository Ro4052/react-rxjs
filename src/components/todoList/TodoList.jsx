import React from "react";
import { List as ImmutableList } from "immutable";
import { List, Popup, Icon } from "semantic-ui-react";

import withObservableStream from "../withObservableStream/WithObservableStream";
import * as todoService from "../../services/todoService";
import TodoFilters from "./todoFilters/TodoFilters";
import TodoItem from "./todoItem/TodoItem";
import TextInput from "../textInput/TextInput";
import styles from "./TodoList.module.css";

const TodoList = props => (
  <>
    <TodoFilters />
    <List divided relaxed className={styles.list}>
      {props.todos.map(todo => (
        <TodoItem
          key={todo.get("id")}
          todo={todo}
          delete={props.onDeleteTodo}
          toggleComplete={props.onToggleComplete}
          editText={props.onEditTodoText}
        />
      ))}
      {props.todos.filter(todo => todo.get("complete")).length > 0 && (
        <List.Item>
          <Popup
            position="left center"
            trigger={
              <Icon
                link
                className={styles.deleteCompleted}
                name="trash alternate"
                color="red"
                onClick={props.onDeleteCompleted}
              />
            }
            content="Delete Completed"
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

const stateMap = state => ({ todos: state.todos || ImmutableList([]) });

export default withObservableStream(todoService.getTodoStream(), stateMap, {
  onSubmitTodo: todoService.onSubmitTodo,
  onDeleteTodo: todoService.onDeleteTodo,
  onToggleComplete: todoService.onToggleComplete,
  onDeleteCompleted: todoService.onDeleteCompleted,
  onEditTodoText: todoService.onEditTodoText
})(TodoList);
