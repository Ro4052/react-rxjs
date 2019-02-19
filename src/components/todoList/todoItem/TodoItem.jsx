import React from "react";
import { List, Icon } from "semantic-ui-react";

export default props => {
  const content = (
    <>
      {props.todo.text}{" "}
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
