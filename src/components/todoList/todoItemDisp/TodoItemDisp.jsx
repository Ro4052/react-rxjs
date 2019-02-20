import React, { memo, lazy, Suspense } from "react";
import { List, Icon, Loader } from "semantic-ui-react";
import cx from "classnames";

import styles from "./TodoItemDisp.module.css";
const TextInput = lazy(() => import("../../textInput/TextInput"));

export default memo(props => {
  const content = props.editMode ? (
    <div ref={props.textInput}>
      <Suspense fallback={<Loader />}>
        <TextInput
          placeholder="Type here..."
          initialText={props.todo.text}
          submit={props.onSubmit}
        />
      </Suspense>
    </div>
  ) : (
    <>
      <span className={styles.todoSpan} onClick={() => props.setEditMode(true)}>
        {props.todo.text}
      </span>
      <div className={styles.actionIcons}>
        <Icon
          link
          name={props.todo.complete ? "undo alternate" : "check circle"}
          color={props.todo.complete ? "red" : "green"}
          onClick={() => props.toggleComplete(props.todo.id)}
        />
        <Icon
          link
          name="close"
          color="red"
          onClick={() => props.delete(props.todo.id)}
        />
      </div>
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
});
