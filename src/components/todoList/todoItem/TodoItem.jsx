import React, { memo, useState, useRef } from "react";

import TodoItemDisp from "../todoItemDisp/TodoItemDisp";

export default memo(props => {
  const [editMode, _setEditMode] = useState(false);
  let textInput = useRef(null);

  function pageClick(event) {
    if (!event.path.includes(textInput.current)) {
      setEditMode(false);
    }
  }

  function detectEscape(event) {
    if (event.keyCode === 27) {
      setEditMode(false);
    }
  }

  function setEditMode(edit) {
    _setEditMode(edit);
    if (edit) {
      document.addEventListener("click", pageClick);
      document.addEventListener("keydown", detectEscape);
    } else {
      document.removeEventListener("click", pageClick);
      document.removeEventListener("keydown", detectEscape);
    }
  }

  function handleSubmit(newText) {
    setEditMode(false);
    props.editText(props.todo.get("id"), newText);
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
