import { describe, it, test, expect } from "vitest";

function addTax(price: number): number {
  return price;
}

describe("it.fails / test.fails (Vitest's answer to Jest's it.failing)", () => {
  it.fails(
    "passes because the assertion throws (known bug not fixed yet)",
    () => {
      expect(addTax(100)).toBe(110);
    },
  );

  test("passes via the options form { fails: true }", { fails: true }, () => {
    expect(addTax(50)).toBe(55);
  });

  it.fails(
    "fails when the body unexpectedly succeeds — your cue to remove .fails",
    () => {
      expect(addTax(0)).toBe(10);
    },
  );

  it.fails(
    "also passes when the code throws, not just on failed assertions",
    () => {
      throw new Error("boom");
    },
  );
});
