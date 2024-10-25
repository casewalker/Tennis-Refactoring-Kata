import * as fs from 'fs';
import * as path from 'path';
// import {TennisGame, TennisGame1, TennisGame2, TennisGame3, TennisGame4, TennisGame5, TennisGame6} from '../src';
import { TennisGame, TennisGame2 } from '../src';
import {Player} from "../src/Player";

// Set the date to 2000
jest.useFakeTimers().setSystemTime(new Date('2000-01-01T00:00:00Z'));

function getAllScores(): Array<[number, number, string]> {
  const testCases = path.resolve(__dirname, 'scores.json');
  const scoreData = fs.readFileSync(testCases).toString();
  const scores = JSON.parse(scoreData);
  return JSON.parse(JSON.stringify(scores));
}

const scores: Array<[number, number, string]> = getAllScores();

function checkScore(game: TennisGame, player1Score: number, player2Score: number, expectedScore: string): void {
  const highestScore: number = Math.max(player1Score, player2Score);
  for (let i = 0; i < highestScore; i++) {
    if (i < player1Score) {
      game.wonPoint('player1');
    }
    if (i < player2Score) {
      game.wonPoint('player2');
    }
  }
  expect(game.getScore()).toEqual(expectedScore);
}

describe('TennisGame', () => {
  describe('TennisGame2', () => {
    scores.forEach(([player1Score, player2Score, expectedScore]) => {
      it(`scores ${player1Score}:${player2Score} as ${expectedScore}`, () => {
        const tennisGame = new TennisGame2();
        tennisGame.registerPlayers({
          player1: new Player("player1", "1979-01-01T00:00:00Z"),
          player2: new Player("player2", "1955-01-01T00:00:00Z"),
        });
        checkScore(tennisGame, player1Score, player2Score, expectedScore);
      });
    });
  });
});
