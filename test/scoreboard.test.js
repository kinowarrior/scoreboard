import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { initialGamePoints, getGameScore, setScore } from '../src/scoreboard';
import Scoreboard from '../src/components/Scoreboard';

configure({ adapter: new Adapter() });

describe('initialGamePoints', () => {
  context('gamePoints', () => {
    it('each player starts with 0 points', () => {
      expect(initialGamePoints.player1).to.equal(0);
      expect(initialGamePoints.player2).to.equal(0);
    })
  })
});

describe('getGameScore', () => {
  it('Love-All', () => {
    const gamePoints = { player1: 0, player2: 0 };

    const gameScore = getGameScore(gamePoints);

    expect(gameScore.scoreCall).to.equal('Love-All');
  });

  it('Fifteen-Love', () => {
    const gamePoints = { player1: 1, player2: 0 };

    const gameScore = getGameScore(gamePoints);

    expect(gameScore.scoreCall).to.equal('Fifteen-Love', 'Implement player scored logic');
  });

  it('Fifteen-Thirty', () => {
    const gamePoints = { player1: 1, player2: 2 };

    const gameScore = getGameScore(gamePoints);

    expect(gameScore.scoreCall).to.equal('Fifteen-Thirty', 'Implement player scored logic');
  });

  it('Win for player1 (after 40-0)', () => {
    const gamePoints = { player1: 4, player2: 0 };

    const { scoreCall, winningPlayer } = getGameScore(gamePoints);

    expect(scoreCall).to.equal('Win for player1', 'Implement player win logic after 40-0');
    expect(winningPlayer).to.equal('player1', 'Implement player win logic after 40-0');
  });

    it('Win for player2 (after 15-40)', () => {
    const gamePoints = { player1: 1, player2: 4 };

    const { scoreCall, winningPlayer } = getGameScore(gamePoints);

    expect(scoreCall).to.equal('Win for player2', 'Implement player win logic after 15-40');
    expect(winningPlayer).to.equal('player2', 'Implement player win logic after 15-40');
  });
});

describe('setScore', () => {
  it('Player 1 scores a point', () => {
    let state = initialGamePoints;

    state = setScore(1, state);

    expect(state.player1).to.equal(1);
    expect(state.player2).to.equal(0);
  });

  it('Player 1 wins game', () => {
    let state = initialGamePoints;

    state = setScore(1, state); // 15 - 0
    state = setScore(1, state); // 30 - 0
    state = setScore(1, state); // 40 - 0
    state = setScore(1, state); // Game

    expect(state.player1).to.equal(4);
    expect(state.player2).to.equal(0);
  });

  it('Players deuce', () => {
    let state = initialGamePoints;

    state = setScore(1, state); // 15 - 0
    state = setScore(1, state); // 30 - 0
    state = setScore(1, state); // 40 - 0
    state = setScore(2, state); // 40 - 15
    state = setScore(2, state); // 40 - 30
    state = setScore(2, state); // 40 - 40 (Deuce)

    expect(state.player1).to.equal(3);
    expect(state.player2).to.equal(3);
  });

  it('Player 1 advantage', () => {
    let state = initialGamePoints;

    state = setScore(1, state); // 15 - 0
    state = setScore(1, state); // 30 - 0
    state = setScore(1, state); // 40 - 0
    state = setScore(2, state); // 40 - 15
    state = setScore(2, state); // 40 - 30
    state = setScore(2, state); // 40 - 40 (Deuce)
    state = setScore(1, state); // AD - 40

    expect(state.player1).to.equal(4);
    expect(state.player2).to.equal(3);
  });

  it('Players double deuce', () => {
    let state = initialGamePoints;

    state = setScore(1, state); // 15 - 0
    state = setScore(1, state); // 30 - 0
    state = setScore(1, state); // 40 - 0
    state = setScore(2, state); // 40 - 15
    state = setScore(2, state); // 40 - 30
    state = setScore(2, state); // 40 - 40 (Deuce)
    state = setScore(1, state); // AD - 40
    state = setScore(2, state); // 40 - 40 (Deuce)

    expect(state.player1).to.equal(3, 'Implement deuce logic');
    expect(state.player2).to.equal(3, 'Implement deuce logic');
  });
});

/* Shallow and useEffect not currently supported with Enzyme
 * there is a spy hack using Jest, but here we're using Mocha
 */
xdescribe('<Scoreboard />', () => {

  it('Love-All', () => {
    const wrapper = shallow(<Scoreboard />);

    expect(wrapper.find('h2#score').text()).to.equal('Score: Love-All');
  });

  it('Fifteen-Love', () => {
    const wrapper = shallow(<Scoreboard />);

    wrapper.find('button.player1-scores').simulate('click');

    expect(wrapper.find('h2#score').text()).to.equal('Score: Fifteen-Love', 'Implement game scoring UI interaction');
  });
  it('Thirty-Love', () => {
    const wrapper = shallow(<Scoreboard />);

    wrapper.find('button.player1-scores').simulate('click');
    wrapper.find('button.player1-scores').simulate('click');

    expect(wrapper.find('h2#score').text()).to.equal('Score: Thirty-Love', 'Implement game scoring UI interaction for a 2 button click for player 1');
  });
  it('Thirty-Fifteen', () => {
    const wrapper = shallow(<Scoreboard />);

    wrapper.find('button.player1-scores').simulate('click');
    wrapper.find('button.player1-scores').simulate('click');
    wrapper.find('button.player2-scores').simulate('click');

    expect(wrapper.find('h2#score').text()).to.equal('Score: Thirty-Fifteen', 'Implement game scoring UI interaction for a 3 button click by each player');
  });
  it('Forty-Fifteen', () => {
    const wrapper = shallow(<Scoreboard />);

    wrapper.find('button.player1-scores').simulate('click');
    wrapper.find('button.player1-scores').simulate('click');
    wrapper.find('button.player2-scores').simulate('click');
    wrapper.find('button.player1-scores').simulate('click');

    expect(wrapper.find('h2#score').text()).to.equal('Score: Forty-Fifteen', 'Implement game scoring UI interaction for a 4 button click by each player');
  });
  it('Forty-Thirty', () => {
    const wrapper = shallow(<Scoreboard />);

    wrapper.find('button.player1-scores').simulate('click');
    wrapper.find('button.player1-scores').simulate('click');
    wrapper.find('button.player2-scores').simulate('click');
    wrapper.find('button.player1-scores').simulate('click');
    wrapper.find('button.player2-scores').simulate('click');

    expect(wrapper.find('h2#score').text()).to.equal('Score: Forty-Thirty', 'Implement game scoring UI interaction for a 5 button click by each player');
  });
  it('Deuce', () => {
    const wrapper = shallow(<Scoreboard />);

    wrapper.find('button.player1-scores').simulate('click');
    wrapper.find('button.player1-scores').simulate('click');
    wrapper.find('button.player2-scores').simulate('click');
    wrapper.find('button.player1-scores').simulate('click');
    wrapper.find('button.player2-scores').simulate('click');
    wrapper.find('button.player2-scores').simulate('click');

    expect(wrapper.find('h2#score').text()).to.equal('Score: Deuce', 'Implement game scoring UI interaction for a 6 button click by each player');
  });
  it('Advantage player1', () => {
    const wrapper = shallow(<Scoreboard />);

    wrapper.find('button.player1-scores').simulate('click');
    wrapper.find('button.player1-scores').simulate('click');
    wrapper.find('button.player2-scores').simulate('click');
    wrapper.find('button.player1-scores').simulate('click');
    wrapper.find('button.player2-scores').simulate('click');
    wrapper.find('button.player2-scores').simulate('click');
    wrapper.find('button.player1-scores').simulate('click');

    expect(wrapper.find('h2#score').text()).to.equal('Score: Advantage player1', 'Implement game scoring UI interaction for a 6 button click by each player');
  });
  it('Win for player1', () => {
    const wrapper = shallow(<Scoreboard />);

    wrapper.find('button.player1-scores').simulate('click');
    wrapper.find('button.player1-scores').simulate('click');
    wrapper.find('button.player1-scores').simulate('click');
    wrapper.find('button.player1-scores').simulate('click');

    expect(wrapper.find('h2#score').text()).to.equal('Score: Win for player1', 'Implement game scoring UI interaction for a 4 button click by each player');
  });
});

describe('Cover all the possible scores', () => {
  it('Love-All', () => {
    const gamePoints = { player1: 0, player2: 0 };
    const gameScore = getGameScore(gamePoints);
    expect(gameScore.scoreCall).to.equal('Love-All');
  });
  it('Fifteen-Love', () => {
    const gamePoints = { player1: 1, player2: 0 };
    const gameScore = getGameScore(gamePoints);
    expect(gameScore.scoreCall).to.equal('Fifteen-Love');
  });
  it('Thirty-Love', () => {
    const gamePoints = { player1: 2, player2: 0 };
    const gameScore = getGameScore(gamePoints);
    expect(gameScore.scoreCall).to.equal('Thirty-Love');
  });
  it('Forty-Love', () => {
    const gamePoints = { player1: 3, player2: 0 };
    const gameScore = getGameScore(gamePoints);
    expect(gameScore.scoreCall).to.equal('Forty-Love');
  });
  it('Win for player1', () => {
    const gamePoints = { player1: 4, player2: 0 };
    const gameScore = getGameScore(gamePoints);
    expect(gameScore.scoreCall).to.equal('Win for player1');
    expect(gameScore.winningPlayer).to.equal('player1', 'Implement player win logic after 40-0');
  });
  it('Love-Fifteen', () => {
    const gamePoints = { player1: 0, player2: 1 };
    const gameScore = getGameScore(gamePoints);
    expect(gameScore.scoreCall).to.equal('Love-Fifteen');
  });
  it('Love-Thirty', () => {
    const gamePoints = { player1: 0, player2: 2 };
    const gameScore = getGameScore(gamePoints);
    expect(gameScore.scoreCall).to.equal('Love-Thirty');
  });
  it('Love-Forty', () => {
    const gamePoints = { player1: 0, player2: 3 };
    const gameScore = getGameScore(gamePoints);
    expect(gameScore.scoreCall).to.equal('Love-Forty');
  });
  it('Win for player2', () => {
    const gamePoints = { player1: 0, player2: 4 };
    const gameScore = getGameScore(gamePoints);
    expect(gameScore.scoreCall).to.equal('Win for player2');
    expect(gameScore.winningPlayer).to.equal('player2', 'Implement player win logic after 0-40');
  });
  it('Fifteen-All', () => {
    const gamePoints = { player1: 1, player2: 1 };
    const gameScore = getGameScore(gamePoints);
    expect(gameScore.scoreCall).to.equal('Fifteen-All');
  });
  it('Thirty-Fifteen', () => {
    const gamePoints = { player1: 2, player2: 1 };
    const gameScore = getGameScore(gamePoints);
    expect(gameScore.scoreCall).to.equal('Thirty-Fifteen');
  });
  it('Forty-Fifteen', () => {
    const gamePoints = { player1: 3, player2: 1 };
    const gameScore = getGameScore(gamePoints);
    expect(gameScore.scoreCall).to.equal('Forty-Fifteen');
  });
  it('Win for player1', () => {
    const gamePoints = { player1: 4, player2: 1 };
    const gameScore = getGameScore(gamePoints);
    expect(gameScore.scoreCall).to.equal('Win for player1');
    expect(gameScore.winningPlayer).to.equal('player1', 'Implement player win logic after 40-0');
  });
  it('Fifteen-Thirty', () => {
    const gamePoints = { player1: 1, player2: 2 };
    const gameScore = getGameScore(gamePoints);
    expect(gameScore.scoreCall).to.equal('Fifteen-Thirty');
  });
  it('Fifteen-Forty', () => {
    const gamePoints = { player1: 1, player2: 3 };
    const gameScore = getGameScore(gamePoints);
    expect(gameScore.scoreCall).to.equal('Fifteen-Forty');
  });
  it('Win for player2', () => {
    const gamePoints = { player1: 1, player2: 4 };
    const gameScore = getGameScore(gamePoints);
    expect(gameScore.scoreCall).to.equal('Win for player2');
    expect(gameScore.winningPlayer).to.equal('player2', 'Implement player win logic after 40-0');
  });
  it('Thirty-All', () => {
    const gamePoints = { player1: 2, player2: 2 };
    const gameScore = getGameScore(gamePoints);
    expect(gameScore.scoreCall).to.equal('Thirty-All');
  });
  it('Forty-Thirty', () => {
    const gamePoints = { player1: 3, player2: 2 };
    const gameScore = getGameScore(gamePoints);
    expect(gameScore.scoreCall).to.equal('Forty-Thirty');
  });
  it('Win for player1', () => {
    const gamePoints = { player1: 4, player2: 2 };
    const gameScore = getGameScore(gamePoints);
    expect(gameScore.scoreCall).to.equal('Win for player1');
    expect(gameScore.winningPlayer).to.equal('player1', 'Implement player win logic after 40-0');
  });
  it('Thirty-Forty', () => {
    const gamePoints = { player1: 2, player2: 3 };
    const gameScore = getGameScore(gamePoints);
    expect(gameScore.scoreCall).to.equal('Thirty-Forty');
  });
  it('Win for player2', () => {
    const gamePoints = { player1: 2, player2: 4 };
    const gameScore = getGameScore(gamePoints);
    expect(gameScore.scoreCall).to.equal('Win for player2');
    expect(gameScore.winningPlayer).to.equal('player2', 'Implement player win logic after 40-0');
  });
  it('Deuce', () => {
    const gamePoints = { player1: 3, player2: 3 };
    const gameScore = getGameScore(gamePoints);
    expect(gameScore.scoreCall).to.equal('Deuce');
  });
  it('Advantage player1', () => {
    const gamePoints = { player1: 4, player2: 3 };
    const gameScore = getGameScore(gamePoints);
    expect(gameScore.scoreCall).to.equal('Advantage player1');
  });
  it('Advantage player2', () => {
    const gamePoints = { player1: 3, player2: 4 };
    const gameScore = getGameScore(gamePoints);
    expect(gameScore.scoreCall).to.equal('Advantage player2');
  });
});
