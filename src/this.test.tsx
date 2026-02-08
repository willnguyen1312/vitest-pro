import { it, expect } from "vitest";

function createSum(this: number, extra: number) {
  return this + extra;
}

it("binds this correctly", () => {
  const boundSum = createSum.bind(5);
  expect(boundSum(3)).toBe(8);
});

declare class Sum<T = any> {
  _value: unknown;
  constructor(value?: T);
}

function Sum(this: Sum, value: unknown) {
  this._value = value;
}

it("binds this in Class correctly", () => {
  const s = new Sum(5);
  expect(s._value).toBe(5);
});
