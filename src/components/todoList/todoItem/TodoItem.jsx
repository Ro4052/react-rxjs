import React from "react";
import { List, Icon } from "semantic-ui-react";
import cx from "classnames";

import styles from "./TodoItem.module.css";

export default props => {
  const content = (
    <>
      {props.todo.text}
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
        onClick={props.toggleComplete}
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
