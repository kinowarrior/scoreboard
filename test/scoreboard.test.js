import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { initialState, getGameScore, setScore } from '../src/scoreboard';
import Scoreboard from '../src/components/Scoreboard';

configure({ adapter: new Adapter() });

describe('initialState', () => {
  context('gamePoints', () => {
    it('each player starts with 0 points', () => {
      expect(initialState.gamePoints.player1).to.equal(0);
      expect(initialState.gamePoints.player2).to.equal(0);
    })
  })
});

describe('getGameScore', () => {
  it('love-all', () => {
    const gamePoints = { player1: 0, player2: 0 };

    const gameScore = getGameScore(gamePoints);

    expect(gameScore.scoreCall).to.equal('love-all');
  });

  it('15-love', () => {
    const gamePoints = { player1: 1, player2: 0 };

    const gameScore = getGameScore(gamePoints);

    expect(gameScore.scoreCall).to.equal('15-love', 'Implement player scored logic');
  });

  it('15-30', () => {
    const gamePoints = { player1: 1, player2: 2 };

    const gameScore = getGameScore(gamePoints);

    expect(gameScore.scoreCall).to.equal('15-30', 'Implement player scored logic');
  });

  it('Game, player1 (after 40-0)', () => {
    const gamePoints = { player1: 4, player2: 0 };

    const { scoreCall, winningPlayer } = getGameScore(gamePoints);

    expect(scoreCall).to.equal('Game, player1', 'Implement player win logic after 40-0');
    expect(winningPlayer).to.equal('player1', 'Implement player win logic after 40-0');
  });

    it('Game, player2 (after 15-40)', () => {
    const gamePoints = { player1: 1, player2: 4 };

    const { scoreCall, winningPlayer } = getGameScore(gamePoints);

    expect(scoreCall).to.equal('Game, player2', 'Implement player win logic after 15-40');
    expect(winningPlayer).to.equal('player2', 'Implement player win logic after 15-40');
  });
});

describe('setScore', () => {
  it('Player 1 scores a point', () => {
    let state = initialState;

    state = setScore(1, state);

    expect(state.gamePoints.player1).to.equal(1);
    expect(state.gamePoints.player2).to.equal(0);
  });

  it('Player 1 wins game', () => {
    let state = initialState;

    state = setScore(1, state); // 15 - 0
    state = setScore(1, state); // 30 - 0
    state = setScore(1, state); // 40 - 0
    state = setScore(1, state); // Game

    expect(state.gamePoints.player1).to.equal(4);
    expect(state.gamePoints.player2).to.equal(0);
  });

  it('Players deuce', () => {
    let state = initialState;

    state = setScore(1, state); // 15 - 0
    state = setScore(1, state); // 30 - 0
    state = setScore(1, state); // 40 - 0
    state = setScore(2, state); // 40 - 15
    state = setScore(2, state); // 40 - 30
    state = setScore(2, state); // 40 - 40 (Deuce)

    expect(state.gamePoints.player1).to.equal(3);
    expect(state.gamePoints.player2).to.equal(3);
  });

  it('Player 1 advantage', () => {
    let state = initialState;

    state = setScore(1, state); // 15 - 0
    state = setScore(1, state); // 30 - 0
    state = setScore(1, state); // 40 - 0
    state = setScore(2, state); // 40 - 15
    state = setScore(2, state); // 40 - 30
    state = setScore(2, state); // 40 - 40 (Deuce)
    state = setScore(1, state); // AD - 40

    expect(state.gamePoints.player1).to.equal(4);
    expect(state.gamePoints.player2).to.equal(3);
  });

  it('Players double deuce', () => {
    let state = initialState;

    state = setScore(1, state); // 15 - 0
    state = setScore(1, state); // 30 - 0
    state = setScore(1, state); // 40 - 0
    state = setScore(2, state); // 40 - 15
    state = setScore(2, state); // 40 - 30
    state = setScore(2, state); // 40 - 40 (Deuce)
    state = setScore(1, state); // AD - 40
    state = setScore(2, state); // 40 - 40 (Deuce)

    expect(state.gamePoints.player1).to.equal(3, 'Implement deuce logic');
    expect(state.gamePoints.player2).to.equal(3, 'Implement deuce logic');
  });
});

describe('<Scoreboard />', () => {
  it('love-all', () => {
    const wrapper = shallow(<Scoreboard />);

    expect(wrapper.find('h2#score').text()).to.equal('Score: love-all');
  });

  it('15-love', () => {
    const wrapper = shallow(<Scoreboard />);

    wrapper.find('button.player1-scores').simulate('click');

    expect(wrapper.find('h2#score').text()).to.equal('Score: 15-love', 'Implement game scoring UI interaction');
  });
  it('30-love', () => {
    const wrapper = shallow(<Scoreboard />);

    wrapper.find('button.player1-scores').simulate('click');
    wrapper.find('button.player1-scores').simulate('click');

    expect(wrapper.find('h2#score').text()).to.equal('Score: 30-love', 'Implement game scoring UI interaction for a 2 button click for player 1');
  });
  it('30-15', () => {
    const wrapper = shallow(<Scoreboard />);

    wrapper.find('button.player1-scores').simulate('click');
    wrapper.find('button.player1-scores').simulate('click');
    wrapper.find('button.player2-scores').simulate('click');

    expect(wrapper.find('h2#score').text()).to.equal('Score: 30-15', 'Implement game scoring UI interaction for a 3 button click by each player');
  });
  it('40-15', () => {
    const wrapper = shallow(<Scoreboard />);

    wrapper.find('button.player1-scores').simulate('click');
    wrapper.find('button.player1-scores').simulate('click');
    wrapper.find('button.player2-scores').simulate('click');
    wrapper.find('button.player1-scores').simulate('click');

    expect(wrapper.find('h2#score').text()).to.equal('Score: 40-15', 'Implement game scoring UI interaction for a 4 button click by each player');
  });
  it('40-30', () => {
    const wrapper = shallow(<Scoreboard />);

    wrapper.find('button.player1-scores').simulate('click');
    wrapper.find('button.player1-scores').simulate('click');
    wrapper.find('button.player2-scores').simulate('click');
    wrapper.find('button.player1-scores').simulate('click');
    wrapper.find('button.player2-scores').simulate('click');

    expect(wrapper.find('h2#score').text()).to.equal('Score: 40-30', 'Implement game scoring UI interaction for a 5 button click by each player');
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
  it('Advantage, player1', () => {
    const wrapper = shallow(<Scoreboard />);

    wrapper.find('button.player1-scores').simulate('click');
    wrapper.find('button.player1-scores').simulate('click');
    wrapper.find('button.player2-scores').simulate('click');
    wrapper.find('button.player1-scores').simulate('click');
    wrapper.find('button.player2-scores').simulate('click');
    wrapper.find('button.player2-scores').simulate('click');
    wrapper.find('button.player1-scores').simulate('click');

    expect(wrapper.find('h2#score').text()).to.equal('Score: Advantage, player1', 'Implement game scoring UI interaction for a 6 button click by each player');
  });
  it('Game, player1', () => {
    const wrapper = shallow(<Scoreboard />);

    wrapper.find('button.player1-scores').simulate('click');
    wrapper.find('button.player1-scores').simulate('click');
    wrapper.find('button.player1-scores').simulate('click');
    wrapper.find('button.player1-scores').simulate('click');

    expect(wrapper.find('h2#score').text()).to.equal('Score: Game, player1', 'Implement game scoring UI interaction for a 4 button click by each player');
  });
});

describe.skip('Cover all the possible scores', () => {
  it('love-all', () => {
    const gamePoints = { player1: 0, player2: 0 };
    const gameScore = getGameScore(gamePoints);
    expect(gameScore.scoreCall).to.equal('love-all');
  });
  it('15-love', () => {
    const gamePoints = { player1: 1, player2: 0 };
    const gameScore = getGameScore(gamePoints);
    expect(gameScore.scoreCall).to.equal('15-love');
  });
  it('30-love', () => {
    const gamePoints = { player1: 2, player2: 0 };
    const gameScore = getGameScore(gamePoints);
    expect(gameScore.scoreCall).to.equal('30-love');
  });
  it('40-love', () => {
    const gamePoints = { player1: 3, player2: 0 };
    const gameScore = getGameScore(gamePoints);
    expect(gameScore.scoreCall).to.equal('40-love');
  });
  it('Game, player1', () => {
    const gamePoints = { player1: 4, player2: 0 };
    const gameScore = getGameScore(gamePoints);
    expect(gameScore.scoreCall).to.equal('Game, player1');
    expect(gameScore.winningPlayer).to.equal('player1', 'Implement player win logic after 40-0');
  });
  it('love-15', () => {
    const gamePoints = { player1: 0, player2: 1 };
    const gameScore = getGameScore(gamePoints);
    expect(gameScore.scoreCall).to.equal('love-15');
  });
  it('love-30', () => {
    const gamePoints = { player1: 0, player2: 2 };
    const gameScore = getGameScore(gamePoints);
    expect(gameScore.scoreCall).to.equal('love-30');
  });
  it('love-40', () => {
    const gamePoints = { player1: 0, player2: 3 };
    const gameScore = getGameScore(gamePoints);
    expect(gameScore.scoreCall).to.equal('love-40');
  });
  it('Game, player2', () => {
    const gamePoints = { player1: 0, player2: 4 };
    const gameScore = getGameScore(gamePoints);
    expect(gameScore.scoreCall).to.equal('Game, player2');
    expect(gameScore.winningPlayer).to.equal('player2', 'Implement player win logic after 0-40');
  });
  it('15-15', () => {
    const gamePoints = { player1: 1, player2: 1 };
    const gameScore = getGameScore(gamePoints);
    expect(gameScore.scoreCall).to.equal('15-all');
  });
  it('30-15', () => {
    const gamePoints = { player1: 2, player2: 1 };
    const gameScore = getGameScore(gamePoints);
    expect(gameScore.scoreCall).to.equal('30-15');
  });
  it('40-15', () => {
    const gamePoints = { player1: 3, player2: 1 };
    const gameScore = getGameScore(gamePoints);
    expect(gameScore.scoreCall).to.equal('40-15');
  });
  it('Game, player1', () => {
    const gamePoints = { player1: 4, player2: 1 };
    const gameScore = getGameScore(gamePoints);
    expect(gameScore.scoreCall).to.equal('Game, player1');
    expect(gameScore.winningPlayer).to.equal('player1', 'Implement player win logic after 40-0');
  });
  it('15-30', () => {
    const gamePoints = { player1: 1, player2: 2 };
    const gameScore = getGameScore(gamePoints);
    expect(gameScore.scoreCall).to.equal('15-30');
  });
  it('15-40', () => {
    const gamePoints = { player1: 1, player2: 3 };
    const gameScore = getGameScore(gamePoints);
    expect(gameScore.scoreCall).to.equal('15-40');
  });
  it('Game, player2', () => {
    const gamePoints = { player1: 1, player2: 4 };
    const gameScore = getGameScore(gamePoints);
    expect(gameScore.scoreCall).to.equal('Game, player2');
    expect(gameScore.winningPlayer).to.equal('player2', 'Implement player win logic after 40-0');
  });
  it('30-all', () => {
    const gamePoints = { player1: 2, player2: 2 };
    const gameScore = getGameScore(gamePoints);
    expect(gameScore.scoreCall).to.equal('30-all');
  });
  it('40-30', () => {
    const gamePoints = { player1: 3, player2: 2 };
    const gameScore = getGameScore(gamePoints);
    expect(gameScore.scoreCall).to.equal('40-30');
  });
  it('Game, player1', () => {
    const gamePoints = { player1: 4, player2: 2 };
    const gameScore = getGameScore(gamePoints);
    expect(gameScore.scoreCall).to.equal('Game, player1');
    expect(gameScore.winningPlayer).to.equal('player1', 'Implement player win logic after 40-0');
  });
  it('30-40', () => {
    const gamePoints = { player1: 2, player2: 3 };
    const gameScore = getGameScore(gamePoints);
    expect(gameScore.scoreCall).to.equal('30-40');
  });
  it('Game, player2', () => {
    const gamePoints = { player1: 2, player2: 4 };
    const gameScore = getGameScore(gamePoints);
    expect(gameScore.scoreCall).to.equal('Game, player2');
    expect(gameScore.winningPlayer).to.equal('player2', 'Implement player win logic after 40-0');
  });
  it('Deuce', () => {
    const gamePoints = { player1: 3, player2: 3 };
    const gameScore = getGameScore(gamePoints);
    expect(gameScore.scoreCall).to.equal('Deuce');
  });
  it('Advantage, player1', () => {
    const gamePoints = { player1: 4, player2: 3 };
    const gameScore = getGameScore(gamePoints);
    expect(gameScore.scoreCall).to.equal('Advantage, player1');
  });
  it('Advantage, player2', () => {
    const gamePoints = { player1: 3, player2: 4 };
    const gameScore = getGameScore(gamePoints);
    expect(gameScore.scoreCall).to.equal('Advantage, player2');
  });
});
