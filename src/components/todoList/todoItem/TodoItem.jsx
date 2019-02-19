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
    this.detectEscape = this.detectEscape.bind(this);
  }

  setTextInput(el) {
    this.textInput = el;
  }

  pageClick(event) {
    if (!event.path.includes(this.textInput)) {
      this.setEditMode(false);
    }
  }

  detectEscape(event) {
    if (event.keyCode === 27) {
      this.setEditMode(false);
    }
  }

  setEditMode(editMode) {
    this.setState({ editMode });
    if (editMode) {
      document.addEventListener("click", this.pageClick);
      document.addEventListener("keydown", this.detectEscape);
    } else {
      document.removeEventListener("click", this.pageClick);
      document.removeEventListener("keydown", this.detectEscape);
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
