import { TennisGame } from './TennisGame';

/**
 * Ideas for refactors:
 * X Score can equal various strings, store strings in variables
 * - Conditionals - see what's shared, extract out common cases
 * X Refactor if-case code blocks into independent functions
 * X Look for any/all duplicated logic
 *   X- Use condition-check variables instead of copy-pasted equality checks
 *   -- Are there any outer if-cases that can be combined in a readable way?
 * X Could score-strings be an array? Index === score string? e.g. idx 0 === "Love"
 *   X- Object instead of array? More readable than array idx
 * - Type for single player
 */

const SCORE_STRING = ['Love', 'Fifteen', 'Thirty', 'Forty'];

export class TennisGame2 implements TennisGame {
  P1point: number = 0;
  P2point: number = 0;

  private player1Name: string;
  private player2Name: string;

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
  }

  getScore(): string {
    let score: string = '';
    
    const tiedScore = this.P1point === this.P2point
    const p1ScoreIsHigher = this.P1point > this.P2point
    const p2ScoreIsHigher = this.P2point > this.P1point

    const p1ScoreIsZero = this.P1point === 0
    const p1ScoreIsLessThanFour = this.P1point < 4
    const p1ScoreIsGreaterThanTwo = this.P1point >2
    const p1HasATwoPlusLead = (this.P1point - this.P2point) >= 2

    const p2ScoreIsZero = this.P2point === 0
    const p2ScoreIsLessThanFour = this.P2point < 4
    const p2ScoreIsGreaterThanTwo = this.P2point >2
    const p2HasATwoPlusLead = (this.P2point - this.P1point) >= 2
    
    if (tiedScore && p1ScoreIsLessThanFour) {
      score = `${SCORE_STRING[this.P1point]}-All`;
    }

    if (tiedScore && p1ScoreIsGreaterThanTwo) {
      score = 'Deuce';
    }

    if (!p1ScoreIsZero && p2ScoreIsZero) {
      score = `${SCORE_STRING[this.P1point]}-Love`;
    }

    if (!p2ScoreIsZero && p1ScoreIsZero) {
      score = `Love-${SCORE_STRING[this.P2point]}`;
    }

    if (!tiedScore && (p1ScoreIsLessThanFour || p2ScoreIsLessThanFour)) {
      score = `${SCORE_STRING[this.P1point]}-${SCORE_STRING[this.P2point]}`;
    }

    if (p1ScoreIsHigher && p2ScoreIsGreaterThanTwo) {
      score = 'Advantage player1';
    }

    if (p2ScoreIsHigher && p1ScoreIsGreaterThanTwo) {
      score = 'Advantage player2';
    }

    if (!p1ScoreIsLessThanFour  && p1HasATwoPlusLead) {
      score = 'Win for player1';
    }

    if (!p2ScoreIsLessThanFour && p2HasATwoPlusLead) {
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
