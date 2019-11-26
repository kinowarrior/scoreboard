import React, { useState, useEffect, useRef } from "react";

import { initialGamePoints, getGameScore, setScore } from '../scoreboard';

export default function Scoreboard() {

  const [gamePoints, setGamePoints] = useState(initialGamePoints);

  const [gameScore, setGameScore] = useState({
    scoreCall: null,
    winningPlayer: null
  });

  React.useEffect(() => {
    const updatedGameScore = getGameScore(gamePoints);
    setGameScore(updatedGameScore);
    },
    [gamePoints]
  );

  const handlePlayer1 = (event) => {
    const updatedGamePoints = setScore(1, gamePoints);
    setGamePoints(updatedGamePoints);
  }

  const handlePlayer2 = (event) => {
    const updatedGamePoints = setScore(2, gamePoints);
    setGamePoints(updatedGamePoints);
  }

  return (
    <>
      <h1>Tennis Scoreboard</h1>
      <h2 id="score">Score: {gameScore.scoreCall}</h2>
      <button onClick={handlePlayer1} className="player1-scores" type="button">
        Player 1 scores
      </button>
      <button onClick={handlePlayer2} className="player2-scores" type="button">
        Player 2 scores
      </button>
    </>
  );
}
