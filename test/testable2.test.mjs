import { describe, test } from "vitest";
import { expect } from "chai";
import { diceHandValue, diceRoll } from "../src/testable2.mjs";

describe("Untestable 2: a dice game", () => {
  test("pair", () => {
    expect(diceHandValue(6, 6)).to.equal(106)
    expect(diceHandValue(3, 3)).to.equal(103)
  });

  test('high', () => {
    expect(diceHandValue(5, 6)).to.equal(6)
    expect(diceHandValue(4, 3)).to.equal(4)
  })

  test('dice roll', () => {
    const rolls = new Set()

    for (let i = 0; i < 500; i++) {
      rolls.add(diceRoll())
    }

    expect(rolls).to.have.all.keys([1, 2, 3, 4, 5, 6])
  })
});
