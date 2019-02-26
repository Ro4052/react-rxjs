import React, { memo, forwardRef, lazy, Suspense } from "react";
import { List, Icon, Loader } from "semantic-ui-react";
import cx from "classnames";

import styles from "./TodoItemDisp.module.css";
const TextInput = lazy(() => import("../../textInput/TextInput"));

export default memo(
  forwardRef((props, textInput) => {
    const content =
      props.editMode && !props.todo.get("complete") ? (
        <div ref={textInput}>
          <Suspense fallback={<Loader />}>
            <TextInput
              placeholder="Type here..."
              initialText={props.todo.get("text")}
              submit={props.onSubmit}
            />
          </Suspense>
        </div>
      ) : (
        <>
          <span
            className={cx({
              [styles.todoSpan]: !props.todo.get("complete")
            })}
            onClick={() =>
              !props.todo.get("complete") && props.setEditMode(true)
            }
          >
            {props.todo.get("text")}
          </span>
          <div className={styles.actionIcons}>
            <Icon
              link
              name={
                props.todo.get("complete") ? "undo alternate" : "check circle"
              }
              color={props.todo.get("complete") ? "red" : "green"}
              onClick={() => props.toggleComplete(props.todo.get("id"))}
            />
            <Icon
              link
              name="close"
              color="red"
              onClick={() => props.delete(props.todo.get("id"))}
            />
          </div>
        </>
      );
    return (
      <List.Item
        className={cx({ [styles.completedTodo]: props.todo.get("complete") })}
        icon={
          <Icon
            name="sticky note outline"
            color={props.todo.get("complete") ? "green" : "black"}
          />
        }
        content={content}
      />
    );
  })
);
