import React from "react";
import { List as ImmutableList } from "immutable";
import { List, Popup, Icon } from "semantic-ui-react";

import useObservableStream from "../useObservableStream/UseObservableStream";
import * as todoService from "../../services/todoService";
import TodoFilters from "./todoFilters/TodoFilters";
import TodoItem from "./todoItem/TodoItem";
import TextInput from "../textInput/TextInput";
import styles from "./TodoList.module.css";

const stateMap = state => ({ todos: state.todos || ImmutableList([]) });

const TodoList = () => {
  const { todos } = useObservableStream(todoService.getTodoStream(), stateMap);
  return (
    <>
      <TodoFilters />
      <List divided relaxed className={styles.todoList}>
        {todos.map(todo => (
          <TodoItem
            key={todo.get("id")}
            todo={todo}
            delete={todoService.onDeleteTodo}
            toggleComplete={todoService.onToggleComplete}
            editText={todoService.onEditTodoText}
          />
        ))}
      </List>
      {todos.filter(todo => todo.get("complete")).size > 0 && (
        <div className={styles.deleteCompleted}>
          <Popup
            position="left center"
            trigger={
              <Icon
                link
                className={styles.deleteCompleted}
                name="trash alternate"
                color="red"
                onClick={todoService.onDeleteCompleted}
              />
            }
            content="Delete Completed"
          />
        </div>
      )}
      <TextInput
        action="Create"
        placeholder="Type here..."
        submit={todoService.onSubmitTodo}
      />
    </>
  );
};

export default TodoList;
