import React, { useState } from "react";
import { List as ImmutableList } from "immutable";
import { Checkbox, List, Popup, Icon } from "semantic-ui-react";
import { sortableContainer } from "react-sortable-hoc";

import useObservableStream from "../useObservableStream/UseObservableStream";
import * as todoService from "../../services/todoService";
import TodoFilters from "./todoFilters/TodoFilters";
import TodoItem from "./todoItem/TodoItem";
import TextInput from "../textInput/TextInput";
import styles from "./TodoList.module.css";

const stateMap = state => ({ todos: state.todos || ImmutableList([]) });
const SortableContainer = sortableContainer(({ children }) => (
  <List divided relaxed>
    {children}
  </List>
));

const TodoList = () => {
  const { todos } = useObservableStream(todoService.getTodoStream(), stateMap);
  const [showPopups, setShowPopups] = useState(true);

  return (
    <>
      <Checkbox
        toggle
        label="Show Popups"
        checked={showPopups}
        onChange={(_, { checked }) => setShowPopups(checked)}
      />
      <TodoFilters />
      <SortableContainer
        onSortEnd={todoService.onReorderTodos}
        useDragHandle
        lockAxis="y"
        lockToContainerEdges={true}
      >
        {todos.map((todo, i) => (
          <TodoItem
            key={todo.get("id")}
            index={i}
            todo={todo}
            delete={todoService.onDeleteTodo}
            toggleComplete={todoService.onToggleComplete}
            editText={todoService.onEditTodoText}
            showPopups={showPopups}
          />
        ))}
      </SortableContainer>
      {todos.filter(todo => todo.get("complete")).size > 0 && (
        <div className={styles.deleteCompleted}>
          <Popup
            position="right center"
            disabled={!showPopups}
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
