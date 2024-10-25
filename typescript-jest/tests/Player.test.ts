import {Player} from "../src/Player";

describe("Player", () => {
  it("creates a player who is 10 years old", () => {
    const player = new Player("Case", "2010-01-01");
    const age = player.getAge(new Date("2020-01-01"));
    expect(age).toEqual(10);
  });
});
