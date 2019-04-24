import React, { memo } from "react";
import { Popup, Icon } from "semantic-ui-react";

import styles from "./ActionItems.module.css";

export default memo(props => (
  <div className={styles.actionIcons}>
    <Popup
      position="left center"
      disabled={!props.allowPopups}
      trigger={
        <Icon
          link
          name={props.todo.get("complete") ? "undo alternate" : "check circle"}
          color={props.todo.get("complete") ? "red" : "green"}
          onClick={() => props.toggleComplete(props.todo.get("id"))}
        />
      }
      content={props.todo.get("complete") ? "Revert" : "Complete"}
    />
    <Popup
      position="right center"
      disabled={!props.allowPopups}
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
));
