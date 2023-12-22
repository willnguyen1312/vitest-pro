import { vi } from "vitest";
import { sum } from "../src/sum.ts";

// Mock sum function with vitest

describe.only("test-mock", () => {
  it("should work", () => {
    const mockSum = vi.fn(sum);
    mockSum.mockReturnValue(3);
    expect(mockSum(1, 2)).toBe(3);
  });
});
