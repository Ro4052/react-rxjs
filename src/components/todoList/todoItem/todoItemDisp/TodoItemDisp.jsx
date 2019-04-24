import React, { memo, forwardRef, lazy, Suspense } from "react";
import { List, Icon, Loader } from "semantic-ui-react";
import { sortableElement, sortableHandle } from "react-sortable-hoc";
import cx from "classnames";

import ActionItems from "../actionItems/ActionItems";
import styles from "./TodoItemDisp.module.css";
const TextInput = lazy(() => import("../../../textInput/TextInput"));

const DragHandle = sortableHandle(() => (
  <Icon className={styles.dragIcon} name="sticky note outline" />
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
        <div className={styles.todoItem}>
          <DragHandle />
          <div
            className={cx(styles.todoItem, {
              [styles.activeTodo]: !props.todo.get("complete")
            })}
            onClick={() =>
              !props.todo.get("complete") && props.setEditMode(true)
            }
          >
            {props.todo.get("text")}
          </div>
          <ActionItems
            todo={props.todo}
            toggleComplete={props.toggleComplete}
            delete={props.delete}
            allowPopups={props.allowPopups}
          />
        </div>
      );

    return (
      <SortableItem index={props.index} todo={props.todo} content={content} />
    );
  })
);
