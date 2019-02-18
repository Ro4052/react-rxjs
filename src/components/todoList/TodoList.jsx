import React, { Component } from "react";
import { List, Input } from "semantic-ui-react";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const text = event.target.value;
    if (text.length > 0 && text.length <= 25) {
      this.setState({
        inputText: text
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      inputText: ""
    });
    console.log(this.state.inputText);
  }

  render() {
    return (
      <>
        <List bulleted>
          {this.state.todos &&
            this.state.todos.map(todo => (
              <List.Item key={todo.id}> {todo.description} </List.Item>
            ))}
        </List>
        <form onSubmit={this.handleSubmit}>
          <Input
            action="Create"
            placeholder="Type here..."
            value={this.state.inputText}
            onChange={this.handleChange}
          />
        </form>
      </>
    );
  }
}

export default TodoList;
