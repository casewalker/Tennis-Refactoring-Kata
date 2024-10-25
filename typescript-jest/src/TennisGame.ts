import { Player } from "./Player";

export interface PlayerRegistration {
  player1: Player;
  player2: Player;
}

export interface TennisGame {
  registerPlayers({ player1, player2 }: PlayerRegistration): void;
  wonPoint(playerName: string): void;
  getScore(): string;
}

export interface TennisGame_Old {
  wonPoint(playerName: string): void;
  getScore(): string;
}