import React, { memo, useState, useRef } from "react";

import TodoItemDisp from "../todoItemDisp/TodoItemDisp";

export default memo(props => {
  const [editMode, _setEditMode] = useState(false);
  const textInput = useRef(null);

  const pageClick = useRef(event => {
    if (!textInput.current.contains(event.target)) {
      setEditMode(false);
    }
  });

  const detectEscape = useRef(event => {
    if (event.keyCode === 27) {
      setEditMode(false);
    }
  });

  function setEditMode(edit) {
    _setEditMode(edit);
    if (edit) {
      document.addEventListener("click", pageClick.current);
      document.addEventListener("keydown", detectEscape.current);
    } else {
      document.removeEventListener("click", pageClick.current);
      document.removeEventListener("keydown", detectEscape.current);
    }
  }

  function handleSubmit(newText) {
    setEditMode(false);
    if (newText !== props.todo.get("text")) {
      props.editText(props.todo.get("id"), newText);
    }
  }

  return (
    <TodoItemDisp
      ref={textInput}
      todo={props.todo}
      editMode={editMode}
      setEditMode={setEditMode}
      delete={props.delete}
      toggleComplete={props.toggleComplete}
      onSubmit={handleSubmit}
    />
  );
});
