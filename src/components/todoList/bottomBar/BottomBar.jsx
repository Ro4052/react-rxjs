import React from "react";
import { Label, Popup, Icon } from "semantic-ui-react";

import {
  getActiveNumber,
  onDeleteCompleted
} from "../../../services/todoService";
import styles from "./BottomBar.module.css";

const BottomBar = ({ todos, allowPopups }) => {
  const [numActive, numComplete] = getActiveNumber();

  return (
    <div className={styles.bottomBar}>
      <Label basic color={numActive > 0 ? "red" : "grey"} size="tiny">
        Active <Label.Detail>{numActive}</Label.Detail>
      </Label>
      <Label basic color={numComplete > 0 ? "green" : "grey"} size="tiny">
        Complete <Label.Detail>{numComplete}</Label.Detail>
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
