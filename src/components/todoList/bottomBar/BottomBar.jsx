import React, { memo } from "react";
import { Label, Popup, Icon } from "semantic-ui-react";

import { onDeleteCompleted } from "../../../services/todoService";
import styles from "./BottomBar.module.css";

const BottomBar = memo(props => (
  <div className={styles.bottomBar}>
    <Label basic color={props.numActive > 0 ? "red" : "grey"} size="mini">
      Active <Label.Detail>{props.numActive}</Label.Detail>
    </Label>
    <Label basic color={props.numComplete > 0 ? "green" : "grey"} size="mini">
      Complete <Label.Detail>{props.numComplete}</Label.Detail>
    </Label>
    {props.todos.filter(todo => todo.get("complete")).size > 0 && (
      <Popup
        position="right center"
        disabled={!props.allowPopups}
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
));

export default BottomBar;
