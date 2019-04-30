import React, { memo } from "react";
import { Dropdown } from "semantic-ui-react";

import {
  getCurrentFilter,
  onChangeFilter
} from "../../../services/todoService";
import styles from "./TodoFilters.module.css";

const TodoFilters = memo(() => {
  const options = [
    { text: "All", value: "all", icon: "tasks" },
    { text: "Active", value: "active", icon: "edit outline" },
    { text: "Completed", value: "completed", icon: "check circle" }
  ];

  return (
    <Dropdown
      fluid
      selection
      className={styles.filters}
      options={options}
      defaultValue={getCurrentFilter()}
      onChange={(_, { value }) => onChangeFilter(value)}
    />
  );
});

export default TodoFilters;
