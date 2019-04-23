import React from "react";
import { Label, Popup, Icon } from "semantic-ui-react";
import cx from "classnames";

import {
  getActiveNumber,
  onDeleteCompleted
} from "../../../services/todoService";
import styles from "./BottomBar.module.css";

const BottomBar = ({ todos, allowPopups }) => {
  const [numActive, numComplete] = getActiveNumber();

  return (
    <div className={styles.bottomBar}>
      <Label className={cx({ [styles.active]: numActive > 0 })}>
        Active: {numActive}
      </Label>
      <Label className={cx({ [styles.complete]: numComplete > 0 })}>
        Complete: {numComplete}
      </Label>
      {todos.filter(todo => todo.get("complete")).size > 0 && (
        <Popup
          position="right center"
          disabled={!allowPopups}
          trigger={
            <Icon
              link
              className={styles.deleteCompleted}
              name="trash alternate"
              color="red"
              onClick={onDeleteCompleted}
            />
          }
          content="Delete Completed"
        />
      )}
    </div>
  );
};

export default BottomBar;
