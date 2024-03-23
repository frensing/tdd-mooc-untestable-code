import { describe, test } from "vitest";
import { expect } from "chai";
import { daysUntilChristmas } from "../src/testable1.mjs";

describe("Untestable 1: days until Christmas", () => {
  test("in a couple of days", () => {
    expect(daysUntilChristmas(new Date('2023-12-20T00:00:00'))).to.equal(5)
    expect(daysUntilChristmas(new Date('2023-12-20T12:00:00'))).to.equal(5)
    expect(daysUntilChristmas(new Date('2023-12-20T23:59:59'))).to.equal(5)
  });

  test('it is today', () => {
    expect(daysUntilChristmas(new Date('2023-12-25T00:00:00'))).to.equal(0)
    expect(daysUntilChristmas(new Date('2023-12-25T12:00:00'))).to.equal(0)
    expect(daysUntilChristmas(new Date('2023-12-25T23:59:59'))).to.equal(0)
  })

  test('we just missed it', () => {
    expect(daysUntilChristmas(new Date('2022-12-26T00:00:00'))).to.equal(364)
    expect(daysUntilChristmas(new Date('2022-12-26T12:00:00'))).to.equal(364)
    expect(daysUntilChristmas(new Date('2022-12-26T23:59:59'))).to.equal(364)
  })

  test('leap year', () => {
    expect(daysUntilChristmas(new Date('2022-12-26T00:00:00'))).to.equal(364)
    expect(daysUntilChristmas(new Date('2023-12-26T00:00:00'))).to.equal(365)
  })
});
