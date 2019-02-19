import React from "react";
import { List, Icon } from "semantic-ui-react";
import cx from "classnames";

import styles from "./TodoItem.module.css";

export default props => {
  const content = (
    <>
      <span className={cx({ [styles.completedTodo]: props.todo.complete })}>
        {props.todo.text}&nbsp;
      </span>
      <Icon
        link
        name={props.todo.complete ? "undo alternate" : "check circle"}
        color={props.todo.complete ? "red" : "green"}
        onClick={props.toggleComplete}
      />
      <Icon
        link
        name="close"
        color="red"
        onClick={() => props.delete(props.todo.id)}
      />
    </>
  );
  return <List.Item icon="sticky note outline" content={content} />;
};
