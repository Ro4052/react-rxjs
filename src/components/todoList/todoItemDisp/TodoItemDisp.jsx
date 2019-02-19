import React from "react";
import { List, Icon } from "semantic-ui-react";
import cx from "classnames";

import TextInput from "../../textInput/TextInput";
import styles from "./TodoItemDisp.module.css";

export default props => {
  const content = props.editMode ? (
    <div ref={props.textInput}>
      <TextInput
        placeholder="Type here..."
        initialText={props.todo.text}
        submit={props.onSubmit}
      />
    </div>
  ) : (
    <>
      <span className={styles.todoSpan} onClick={() => props.setEditMode(true)}>
        {" "}
        {props.todo.text}{" "}
      </span>
      <Icon
        link
        className={styles.actionIcon}
        name="close"
        color="red"
        onClick={() => props.delete(props.todo.id)}
      />
      <Icon
        link
        className={styles.actionIcon}
        name={props.todo.complete ? "undo alternate" : "check circle"}
        color={props.todo.complete ? "red" : "green"}
        onClick={() => props.toggleComplete(props.todo.id)}
      />
    </>
  );
  return (
    <List.Item
      className={cx({ [styles.completedTodo]: props.todo.complete })}
      icon={
        <Icon
          name="sticky note outline"
          color={props.todo.complete ? "green" : "black"}
        />
      }
      content={content}
    />
  );
};
