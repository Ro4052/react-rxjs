import React, { useState, useRef } from "react";
import { List as ImmutableList } from "immutable";
import { Checkbox, Message, Icon, List } from "semantic-ui-react";
import { sortableContainer } from "react-sortable-hoc";

import useObservableStream from "../useObservableStream/UseObservableStream";
import useContainerPatch from "../useContainerPatch/UseContainerPatch";
import * as todoService from "../../services/todoService";
import TodoFilters from "./todoFilters/TodoFilters";
import TodoItem from "./todoItem/TodoItem";
import BottomBar from "./bottomBar/BottomBar";
import TextInput from "../textInput/TextInput";

const stateMap = state => ({ todos: state.todos || ImmutableList([]) });
const SortableContainer = sortableContainer(({ children }) => (
  <List relaxed>{children}</List>
));

const TodoList = () => {
  const { todos } = useObservableStream(todoService.getTodoStream(), stateMap);
  const [numActive, numComplete] = todoService.getActiveNumber();

  const localStorePopups = localStorage.getItem("allowPopups");
  const [allowPopups, setAllowPopups] = useState(localStorePopups !== "false");

  const container = useRef();
  const [onStart, onMove, onEnd] = useContainerPatch(
    container,
    ({ oldIndex, newIndex }) => todoService.onReorderTodos(oldIndex, newIndex)
  );

  return (
    <>
      <Checkbox
        toggle
        label="Allow Popups"
        checked={allowPopups}
        onChange={(_, { checked }) => {
          setAllowPopups(checked);
          localStorage.setItem("allowPopups", checked);
        }}
      />
      <TodoFilters />
      {numActive === 0 && numComplete === 0 ? (
        <Message icon success>
          <Icon name="smile outline" />
          <Message.Content>You're all done...</Message.Content>
        </Message>
      ) : (
        <SortableContainer
          ref={container}
          useDragHandle
          lockAxis="y"
          onSortStart={onStart}
          onSortMove={onMove}
          onSortEnd={onEnd}
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
      )}
      <BottomBar
        todos={todos}
        allowPopups={allowPopups}
        numActive={numActive}
        numComplete={numComplete}
      />
      <TextInput
        action="Create"
        placeholder="Type here..."
        submit={todoService.onSubmitTodo}
      />
    </>
  );
};

export default TodoList;
