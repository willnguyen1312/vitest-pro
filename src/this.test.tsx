import { it, expect } from "vitest";

function createSum(this: number, extra: number) {
  return this + extra;
}

it("binds this correctly", () => {
  const boundSum = createSum.bind(5);
  expect(boundSum(3)).toBe(8);
});
