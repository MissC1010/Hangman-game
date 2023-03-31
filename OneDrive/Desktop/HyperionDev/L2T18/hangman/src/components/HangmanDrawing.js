import React from "react";
import h1 from "../Drawings/state1.GIF";
import h2 from "../Drawings/state2.GIF";
import h3 from "../Drawings/state3.GIF";
import h4 from "../Drawings/state4.GIF";
import h5 from "../Drawings/state5.GIF";
import h6 from "../Drawings/state6.GIF";
import h7 from "../Drawings/state7.GIF";
import h8 from "../Drawings/state8.GIF";
import h9 from "../Drawings/state9.GIF";
import h10 from "../Drawings/state10.gif";
import h11 from "../Drawings/state11.GIF";

const HangmanDrawing = ({ incorrectGuesses }) => {
  const images = [h1, h2, h3, h4, h5, h6, h7, h8, h9, h10, h11];
  return (
    <img
      src={images[incorrectGuesses]}
      alt={`Hangman drawing with ${incorrectGuesses} incorrect guesses`}
    />
  );
};

export default HangmanDrawing;
