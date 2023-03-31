import React, { useState } from "react";

const UserInput = ({ onGuess }) => {
  //// state to store input value
  const [inputValue, setInputValue] = useState("");

  // check if input value is not empty, passes it to parent component to handle guess
  //reset input values to empty string
  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue) {
      onGuess(inputValue.toLowerCase());
      setInputValue("");
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value); // update input value state with user input
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-input">
      <label>
        Guess a letter:
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          maxLength={1}
        />
      </label>
      <button type="submit">Guess</button>
    </form>
  );
};

export default UserInput;
