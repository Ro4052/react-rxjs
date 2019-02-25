import React from "react";

import TodoList from "./components/todoList/TodoList";
import styles from "./App.module.css";

export default () => {
  return (
    <div className={styles.containerDiv}>
      <h1> React and RxJS Todo List </h1>
      <TodoList />
    </div>
  );
};
