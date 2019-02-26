import React from "react";
import { Dropdown } from "semantic-ui-react";

import withObservableStream from "../../withObservableStream/WithObservableStream";
import * as todoService from "../../../services/todoService";

const TodoFilters = props => {
  const options = [
    { text: "All", value: "all" },
    { text: "Active", value: "active" },
    { text: "Completed", value: "completed" }
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
