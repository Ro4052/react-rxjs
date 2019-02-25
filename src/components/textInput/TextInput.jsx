import React, { useState } from "react";
import { Input } from "semantic-ui-react";

export default props => {
  const [inputText, setInputText] = useState(props.initialText || "");

  function handleChange(event) {
    const text = event.target.value;
    if (text.length <= 25) {
      setInputText(text);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (inputText.length > 0) {
      props.submit(inputText);
      setInputText("");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        fluid
        action={props.action}
        placeholder={props.placeholder}
        value={inputText}
        onChange={handleChange}
      />
    </form>
  );
};
