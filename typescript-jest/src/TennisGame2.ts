import { TennisGame } from './TennisGame';

/**
 * Ideas for refactors:
 * - Score can equal various strings, store strings in variables
 * - Conditionals - see what's shared, extract out common cases
 * - Refactor if-case code blocks into independent functions
 * - Look for any/all duplicated logic
 *   -- Use condition-check variables instead of copy-pasted equality checks
 * - Could score-strings be an array? Index === score string? e.g. idx 0 === "Love"
 *   -- Object instead of array? More readable than array idx
 * - Type for single player
 */

const SCORE_STRING = ['Love', 'Fifteen', 'Thirty', 'Forty'];

export class TennisGame2 implements TennisGame {
  P1point: number = 0;
  P2point: number = 0;

  P1res: string = '';
  P2res: string = '';

  private player1Name: string;
  private player2Name: string;

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
  }

  getScore(): string {
    let score: string = '';
    if (this.P1point === this.P2point && this.P1point < 4) {
      score = `${SCORE_STRING[this.P1point]}-All`;
    }

    if (this.P1point === this.P2point && this.P1point >= 3)
      score = 'Deuce';

    if (this.P1point > 0 && this.P2point === 0) {
      this.P1res = SCORE_STRING[this.P1point];

      this.P2res = 'Love';
      score = this.P1res + '-' + this.P2res;
    }
    if (this.P2point > 0 && this.P1point === 0) {
      this.P2res = SCORE_STRING[this.P2point];


      this.P1res = 'Love';
      score = this.P1res + '-' + this.P2res;
    }

    // TODO Clean this up
    if ((this.P1point > this.P2point && this.P1point < 4) || (this.P2point > this.P1point && this.P2point < 4)) {
      this.P1res = SCORE_STRING[this.P1point];
      this.P2res = SCORE_STRING[this.P2point];
      score = this.P1res + '-' + this.P2res;
    }

    if (this.P1point > this.P2point && this.P2point >= 3) {
      score = 'Advantage player1';
    }

    if (this.P2point > this.P1point && this.P1point >= 3) {
      score = 'Advantage player2';
    }

    if (this.P1point >= 4 && this.P2point >= 0 && (this.P1point - this.P2point) >= 2) {
      score = 'Win for player1';
    }
    if (this.P2point >= 4 && this.P1point >= 0 && (this.P2point - this.P1point) >= 2) {
      score = 'Win for player2';
    }
    return score;
  }

  SetP1Score(score: number): void {
    for (let i = 0; i < score; i++) {
      this.P1Score();
    }
  }

  SetP2Score(score: number): void {
    for (let i = 0; i < score; i++) {
      this.P2Score();
    }
  }

  P1Score(): void {
    this.P1point++;
  }

  P2Score(): void {
    this.P2point++;
  }

  wonPoint(player: string): void {
    if (player === 'player1')
      this.P1Score();
    else
      this.P2Score();
  }
}
