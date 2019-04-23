import React, { useState } from "react";
import { List as ImmutableList } from "immutable";
import { Checkbox, List } from "semantic-ui-react";
import { sortableContainer } from "react-sortable-hoc";

import useObservableStream from "../useObservableStream/UseObservableStream";
import * as todoService from "../../services/todoService";
import TodoFilters from "./todoFilters/TodoFilters";
import TodoItem from "./todoItem/TodoItem";
import BottomBar from "./bottomBar/BottomBar";
import TextInput from "../textInput/TextInput";

const stateMap = state => ({ todos: state.todos || ImmutableList([]) });
const SortableContainer = sortableContainer(({ children }) => (
  <List divided relaxed>
    {children}
  </List>
));

const TodoList = () => {
  const { todos } = useObservableStream(todoService.getTodoStream(), stateMap);
  const [allowPopups, setAllowPopups] = useState(true);

  return (
    <>
      <Checkbox
        toggle
        label="Allow Popups"
        checked={allowPopups}
        onChange={(_, { checked }) => setAllowPopups(checked)}
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
            allowPopups={allowPopups}
          />
        ))}
      </SortableContainer>
      <BottomBar todos={todos} allowPopups={allowPopups} />
      <TextInput
        action="Create"
        placeholder="Type here..."
        submit={todoService.onSubmitTodo}
      />
    </>
  );
};

export default TodoList;
