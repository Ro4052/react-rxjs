import React, { useState, useRef, useEffect } from "react";

import TodoItemDisp from "./todoItemDisp/TodoItemDisp";

export default props => {
  const [editMode, setEditMode] = useState(false);
  const textInput = useRef(null);

  useEffect(() => {
    const detectClick = event => {
      if (textInput.current && !textInput.current.contains(event.target)) {
        setEditMode(false);
      }
    };
    const detectEscape = event => {
      if (event.keyCode === 27) {
        setEditMode(false);
      }
    };

    if (editMode) {
      document.addEventListener("click", detectClick);
      document.addEventListener("keydown", detectEscape);
    }

    return () => {
      document.removeEventListener("click", detectClick);
      document.removeEventListener("keydown", detectEscape);
    };
  }, [editMode]);

  function handleSubmit(newText) {
    setEditMode(false);
    if (newText !== props.todo.get("text")) {
      props.editText(props.todo.get("id"), newText);
    }
  }

  return (
    <TodoItemDisp
      ref={textInput}
      index={props.index}
      todo={props.todo}
      editMode={editMode}
      setEditMode={setEditMode}
      delete={props.delete}
      toggleComplete={props.toggleComplete}
      onSubmit={handleSubmit}
      allowPopups={props.allowPopups}
    />
  );
};
