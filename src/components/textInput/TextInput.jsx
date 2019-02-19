import React, { Component } from "react";
import { Input } from "semantic-ui-react";

class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: this.props.initialText || ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const text = event.target.value;
    if (text.length <= 25) {
      this.setState({
        inputText: text
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.inputText.length > 0) {
      this.props.submit(this.state.inputText);
      this.setState({
        inputText: ""
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          action={this.props.action}
          placeholder={this.props.placeholder}
          value={this.state.inputText}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

export default TextInput;
