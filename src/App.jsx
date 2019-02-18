import React, { Component } from "react";

import TodoList from "./components/todoList/TodoList";

class App extends Component {
  render() {
    return (
      <>
        <h1> React and RxJS Todo List </h1>
        <TodoList />
      </>
    );
  }
}

export default App;
