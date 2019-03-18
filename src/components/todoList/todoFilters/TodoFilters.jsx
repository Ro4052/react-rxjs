import React from "react";
import { Dropdown } from "semantic-ui-react";

import { onChangeFilter } from "../../../services/todoService";

const TodoFilters = () => {
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
      onChange={(_, { value }) => onChangeFilter(value)}
    />
  );
};

export default TodoFilters;
