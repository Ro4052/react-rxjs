import React, { memo, forwardRef, lazy, Suspense } from "react";
import { List, Popup, Icon, Loader } from "semantic-ui-react";
import { sortableElement, sortableHandle } from "react-sortable-hoc";
import cx from "classnames";

import styles from "./TodoItemDisp.module.css";
const TextInput = lazy(() => import("../../textInput/TextInput"));

const DragHandle = sortableHandle(() => (
  <Icon className={styles.dragIcon} name="grab" />
));
const SortableItem = sortableElement(({ todo, content }) => (
  <List.Item
    className={cx(styles.todoItem, {
      [styles.completedTodo]: todo.get("complete")
    })}
  >
    {content}
  </List.Item>
));

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
            <DragHandle />
            {props.todo.get("text")}
          </span>
          <div className={styles.actionIcons}>
            <Popup
              position="left center"
              trigger={
                <Icon
                  link
                  name={
                    props.todo.get("complete")
                      ? "undo alternate"
                      : "check circle"
                  }
                  color={props.todo.get("complete") ? "red" : "green"}
                  onClick={() => props.toggleComplete(props.todo.get("id"))}
                />
              }
              content={props.todo.get("complete") ? "Revert" : "Complete"}
            />
            <Popup
              position="right center"
              trigger={
                <Icon
                  link
                  name="close"
                  color="red"
                  onClick={() => props.delete(props.todo.get("id"))}
                />
              }
              content="Delete"
            />
          </div>
        </>
      );
    return (
      <SortableItem index={props.index} todo={props.todo} content={content} />
    );
  })
);
