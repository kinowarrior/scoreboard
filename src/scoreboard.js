export const initialGamePoints = {
    player1: 0,
    player2: 0,
};

export function setScore(playerNumber, previousGamePoints) {
  if(previousGamePoints.player1 === 4 && previousGamePoints.player2 === 3 && playerNumber === 2) {
    return { ...previousGamePoints, player1: 3, player2: 3 }
  } else if (previousGamePoints.player2 === 4 && previousGamePoints.player1 === 3 && playerNumber === 1) {
    return { ...previousGamePoints, player1: 3, player2: 3 }
  } else {
    return { ...previousGamePoints, [`player${playerNumber}`]: previousGamePoints[`player${playerNumber}`] + 1 }
  }
}

export function getGameScore(gamePoints) {
    const allScores = [
      [0, 0, "Love-All"],
      [1, 1, "Fifteen-All"],
      [2, 2, "Thirty-All"],
      [3, 3, "Deuce"],
      [4, 4, "Deuce"],

      [1, 0, "Fifteen-Love"],
      [0, 1, "Love-Fifteen"],
      [2, 0, "Thirty-Love"],
      [0, 2, "Love-Thirty"],
      [3, 0, "Forty-Love"],
      [0, 3, "Love-Forty"],
      [4, 0, "Win for player1"],
      [0, 4, "Win for player2"],

      [2, 1, "Thirty-Fifteen"],
      [1, 2, "Fifteen-Thirty"],
      [3, 1, "Forty-Fifteen"],
      [1, 3, "Fifteen-Forty"],
      [4, 1, "Win for player1"],
      [1, 4, "Win for player2"],

      [3, 2, "Forty-Thirty"],
      [2, 3, "Thirty-Forty"],
      [4, 2, "Win for player1"],
      [2, 4, "Win for player2"],

      [4, 3, "Advantage player1"],
      [3, 4, "Advantage player2"],

      [5, 3, "Win for player1"],
      [3, 5, "Win for player2"],

      [6, 4, "Win for player1"],
      [4, 6, "Win for player2"],
  ];

  const getScore = () => {
    let found = allScores.find((score) => {
      return score[0] === gamePoints.player1 && score[1] === gamePoints.player2;
    });
    return found ? found[2] : 'Game Over';
  };

  const result = {
    scoreCall: getScore(),
    winningPlayer: null
  };

  if (result.scoreCall && result.scoreCall.includes('Win')) {
    result.winningPlayer = result.scoreCall.substring("Win for ".length);
  }

  return result;
}
