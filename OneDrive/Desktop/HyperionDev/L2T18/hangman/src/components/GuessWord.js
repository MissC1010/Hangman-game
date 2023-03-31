import React from "react";

// receives the word to guess and an array of letters that have been guessed
const GuessWord = ({ word, guessedLetters }) => {
  // Split the word into an array of letters
  const letters = word.split("");
  // Check if a letter has been guessed
  const isLetterGuessed = (letter) => guessedLetters.includes(letter);
  // Style for each letter
  const letterStyle = {
    display: "inline-block",
    margin: "0 4px", // add some spacing between letters
  };

  // Render each letter as a span element
  return (
    <div>
      {letters.map((letter, index) => (
        <span key={`${letter}-${index}`} style={letterStyle}>
          {isLetterGuessed(letter) ? letter : "_"}
        </span>
      ))}
    </div>
  );
};

export default GuessWord;
