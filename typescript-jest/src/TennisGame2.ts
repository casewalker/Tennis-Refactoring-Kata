import {Player} from "./Player";
import {PlayerRegistration, TennisGame} from './TennisGame';

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
  private player1: Player | undefined;
  private player2: Player | undefined;

  registerPlayers({ player1, player2 }: PlayerRegistration): void {
    this.player1 = player1;
    this.player2 = player2;
  }

  getScore(): string {
    if (this.player1 == undefined || this.player2 == undefined) {
      throw new Error("Some player(s) were undefined");
    }

    const today = new Date();
    let score: string = '';
    
    const tiedScore = this.player1.score === this.player2.score
    const p1ScoreIsHigher = this.player1.score > this.player2.score
    const p2ScoreIsHigher = this.player2.score > this.player1.score

    const p1ScoreIsZero = this.player1.score === 0
    const p1ScoreIsLessThanFour = this.player1.score < 4
    const p1ScoreIsGreaterThanTwo = this.player1.score >2
    const p1HasATwoPlusLead = (this.player1.score - this.player2.score) >= 2

    const p2ScoreIsZero = this.player2.score === 0
    const p2ScoreIsLessThanFour = this.player2.score < 4
    const p2ScoreIsGreaterThanTwo = this.player2.score >2
    const p2HasATwoPlusLead = (this.player2.score - this.player1.score) >= 2
    
    if (tiedScore && p1ScoreIsLessThanFour) {
      score = `${SCORE_STRING[this.player1.score]}-All`;
    }

    if (tiedScore && p1ScoreIsGreaterThanTwo) {
      score = 'Deuce';
    }

    if (!p1ScoreIsZero && p2ScoreIsZero) {
      score = `${SCORE_STRING[this.player1.score]}-Love`;
    }

    if (!p2ScoreIsZero && p1ScoreIsZero) {
      score = `Love-${SCORE_STRING[this.player2.score]}`;
    }

    if (!tiedScore && (p1ScoreIsLessThanFour || p2ScoreIsLessThanFour)) {
      score = `${SCORE_STRING[this.player1.score]}-${SCORE_STRING[this.player2.score]}`;
    }

    if (p1ScoreIsHigher && p2ScoreIsGreaterThanTwo) {
      score = `Advantage ${this.player1.name} (${this.player1.getAge(today)} years old)`;
    }

    if (p2ScoreIsHigher && p1ScoreIsGreaterThanTwo) {
      score = `Advantage ${this.player2.name} (${this.player2.getAge(today)} years old)`;
    }

    if (!p1ScoreIsLessThanFour  && p1HasATwoPlusLead) {
      score = `Win for ${this.player1.name} (${this.player1.getAge(today)} years old)`;
    }

    if (!p2ScoreIsLessThanFour && p2HasATwoPlusLead) {
      score = `Win for ${this.player2.name} (${this.player2.getAge(today)} years old)`;
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
    this.player1!.score++;
  }

  P2Score(): void {
    this.player2!.score++;
  }

  wonPoint(player: string): void {
    if (player === 'player1')
      this.P1Score();
    else
      this.P2Score();
  }
}
