import React, { Component } from "react";
import { List, Icon } from "semantic-ui-react";
import cx from "classnames";

import TextInput from "../../textInput/TextInput";
import styles from "./TodoItem.module.css";

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false
    };
    this.setEditMode = this.setEditMode.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.pageClick = this.pageClick.bind(this);
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
    const content = this.state.editMode ? (
      <div ref={el => (this.textInput = el)}>
        <TextInput
          placeholder="Type here..."
          initialText={this.props.todo.text}
          submit={this.handleSubmit}
        />
      </div>
    ) : (
      <>
        <span
          className={styles.todoSpan}
          onClick={() => this.setEditMode(true)}
        >
          {" "}
          {this.props.todo.text}{" "}
        </span>
        <Icon
          link
          className={styles.actionIcon}
          name="close"
          color="red"
          onClick={() => this.props.delete(this.props.todo.id)}
        />
        <Icon
          link
          className={styles.actionIcon}
          name={this.props.todo.complete ? "undo alternate" : "check circle"}
          color={this.props.todo.complete ? "red" : "green"}
          onClick={this.props.toggleComplete}
        />
      </>
    );
    return (
      <List.Item
        className={cx({ [styles.completedTodo]: this.props.todo.complete })}
        icon={
          <Icon
            name="sticky note outline"
            color={this.props.todo.complete ? "green" : "black"}
          />
        }
        content={content}
      />
    );
  }
}

export default TodoItem;
