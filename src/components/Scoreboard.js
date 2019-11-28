import React, { Component } from 'react';

class Scoreboard extends Component {
  render() {
    return (
      <div>
        <h1>Tennis Scoreboard</h1>
        <h2 id="score">Score: love-all</h2>
        <button className="player1-scores" type="button">
          Player 1 scores
        </button>
        <button className="player2-scores" type="button">
          Player 2 scores
        </button>
      </div>
    );
  };
}

export default Scoreboard;
