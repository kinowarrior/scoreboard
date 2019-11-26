# Tennis Scoreboard

## Requirements

Please fix failing tests:

- `getGameScore`: will require implementing the "player scored logic"
- `getGameScore`: will require implementing the "player win logic" after 40-0: `Game, player1`
- `setScore`: will require implementing the "deuce logic"
- `<Scoreboard />`: will require implementing the game scoring UI interactions

## Tennis scoring

1. Each player can have either of these points in one game: 0, 15, 30, 40, A.
2. If one player has 40, and her opponent has less than 40, and she wins the next point, she wins the game.
3. If both players reach 40 the game is in 'Deuce'.
4. If the game is in 'Deuce', the winner of the next point has 'Advantage' (A).
5. If the player with A wins the point she wins the game.
6. If the player without A wins the point the game goes back to 'Deuce'.

Score Calling:
- When a player has 0 points, it is called 'love'
- When both players have the same score, the suffixe '-all' is added
- If player1 has advantage, the score is called 'Advantage, player1'
- If player1 wins, the score is called 'Game, player1'

Score Calling examples:
  - 0-0 = love-all
  - 15-15 = 15-all
  - 15-0 = 15-love
  - 40-40 = Deuce
  - AD-40 = Advantage, player1

Useful links with more details on score calling:
  - https://www.thoughtco.com/simple-introduction-to-tennis-scoring-for-beginners-3207375
  - https://en.wikipedia.org/wiki/Tennis_scoring_system#Game_score


## To run locally

- Clone the project on your local machine
- Use node version specified in `.nvmrc` or make `nvm` use correct node version: `nvm use`
- Install dependencies: `npm install`
- Run the development version of the app with auto-reloading: `npm start`
  > The browser will automatically be loaded and the app displayed.
- Run the tests: `npm run test`
  > If you want the tests to be automatically re-executed on change: `npm run test -- --watch`
- When you are ready to fully test your logic for `getGameScore` then remove the `.skip()` function from the last suite of tests.

## Notes

- Don’t worry about external state managers (i.e. redux), patterns and things like isomorphic/universal rendering.
- You will be adding functionality to your response once you progress to the paring exercise with two of our engineers.
- The logic of the problem is meant to be straightforward with no intentionally hidden gotchas. 
- Writing css/sass is not required at this stage, but may be asked during the next stage of the interview.
