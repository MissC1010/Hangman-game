import React, { useState, useEffect } from "react";
import "./App.css";

import HangmanDrawing from "./components/HangmanDrawing";
import GuessWord from "./components/GuessWord";
import UserInput from "./components/UserInput";
import textfile from "./Dictionary.txt";

const App = () => {
  // Initialize state variables
  const [word, setWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [helpContent, setHelpContent] = useState("");

  // Fetch random word from dictionary on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(textfile);
        const data = await response.text();
        const words = data.split("\n");
        // Get a random word from dictionary file
        let randomWord = "";
        while (randomWord.length < 2 || randomWord.length > 9) {
          const randomIndex = Math.floor(Math.random() * words.length);
          randomWord = words[randomIndex].trim().toLowerCase();
        }
        // Set the random word as state
        setWord(randomWord);
      } catch (error) {
        console.error("Error fetching dictionary file:", error);
      }
    };
    fetchData();
  }, []);

  // Update guessed letters and incorrect guesses on user guess
  const handleGuess = (letter) => {
    setGuessedLetters([...guessedLetters, letter]);
    if (!word.includes(letter)) {
      setIncorrectGuesses(incorrectGuesses + 1);
    }
  };

  // Determine if game is over based on number of incorrect guesses
  const isGameOver = () => {
    const guessedWord = word
      .split("")
      .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
      .join("");

    return guessedWord === word || incorrectGuesses >= 11;
  };

  // Restart game with new random word
  const restartGame = async () => {
    try {
      const response = await fetch(textfile);
      const data = await response.text();
      const words = data.split("\n");

      // Get a random word from dictionary file
      let randomWord = "";
      while (randomWord.length < 2 || randomWord.length > 9) {
        const randomIndex = Math.floor(Math.random() * words.length);
        randomWord = words[randomIndex].trim().toLowerCase();
      }
      // Reset game state with new word
      setGuessedLetters([]);
      setIncorrectGuesses(0);
      setWord(randomWord);
    } catch (error) {
      console.error("Error fetching dictionary file:", error);
    }
  };

  // Set help content when user clicks on "Instructions" button
  const showHelp = () => {
    setHelpContent(`
      <h2>Instructions</h2>
      <p>Guess a letter which you think is part of the word. If the letter guessed is correct it will show on the word. If it is incorrect you will have to guess again until you get the correct word. Once you are out of chances to guess, your man will be hanged and the game will end.</p>
    `);
  };

  // Set props for GuessWord component
  const guessWordProps = [{ word, guessedLetters }];

  return (
    <div className="App">
      <h1>Hangman Game</h1>
      <HangmanDrawing incorrectGuesses={incorrectGuesses} />
      {guessWordProps.map((props, index) => (
        <GuessWord key={index} {...props} />
      ))}
      {isGameOver() ? (
        <div>
          <p>{incorrectGuesses >= 11 ? "You lost!" : "You won!"}</p>
          <p>Game over! The word was {word}.</p>
          <button onClick={restartGame}>Play Again</button>
        </div>
      ) : (
        <UserInput onGuess={handleGuess} />
      )}
      <button onClick={showHelp}>Instructions</button>
      <div dangerouslySetInnerHTML={{ __html: helpContent }}></div>
    </div>
  );
};
export default App;
