import React, { Component } from "react";

import TodoItemDisp from "../todoItemDisp/TodoItemDisp";

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false
    };
    this.setTextInput = this.setTextInput.bind(this);
    this.setEditMode = this.setEditMode.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.pageClick = this.pageClick.bind(this);
  }

  setTextInput(el) {
    this.textInput = el;
  }

  pageClick(event) {
    if (!event.path.includes(this.textInput)) {
      this.setEditMode(false);
    }
  }

  setEditMode(editMode) {
    this.setState({ editMode });
    if (editMode) {
      document.addEventListener("click", this.pageClick);
    } else {
      document.removeEventListener("click", this.pageClick);
    }
  }

  handleSubmit(newText) {
    this.setEditMode(false);
    this.props.editText(this.props.todo.id, newText);
  }

  render() {
    return (
      <TodoItemDisp
        todo={this.props.todo}
        editMode={this.state.editMode}
        setTextInput={this.setTextInput}
        setEditMode={this.setEditMode}
        delete={this.props.delete}
        toggleComplete={this.props.toggleComplete}
        onSubmit={this.props.handleSubmit}
      />
    );
  }
}

export default TodoItem;
