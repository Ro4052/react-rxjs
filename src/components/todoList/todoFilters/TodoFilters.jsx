import React from "react";
import { Dropdown } from "semantic-ui-react";

import withObservableStream from "../../withObservableStream/WithObservableStream";
import * as todoService from "../../../services/todoService";

const TodoFilters = props => {
  const options = [
    { text: "All", value: "all", icon: "tasks" },
    { text: "Active", value: "active", icon: "edit outline" },
    { text: "Completed", value: "completed", icon: "check circle" }
  ];
  return (
    <Dropdown
      fluid
      selection
      options={options}
      defaultValue="all"
      onChange={(_, { value }) => props.onChangeFilter(value)}
    />
  );
};

export default withObservableStream(todoService.getTodoStream(), null, {
  onChangeFilter: todoService.onChangeFilter
})(TodoFilters);
