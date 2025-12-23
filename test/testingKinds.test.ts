import { describe, test, vi } from "vitest";
import { getNumberFromGithub } from "./testingKinds";

// Mock getNumberFromGithub
vi.mock("./testingKinds", () => {
  return {
    getNumberFromGithub: vi.fn(() => 10),
  };
});

const doubleValue = (num: number) => {
  return num * 2;
};

const plusOne = (num: number) => {
  return num + 1;
};

describe("unit tests", () => {
  test("doubles the value correctly", () => {
    const result = doubleValue(4);
    expect(result).toBe(8);
  });
});

const plusOneAndDouble = (num: number) => {
  const plusOneResult = plusOne(num);
  return doubleValue(plusOneResult);
};

describe("e2e tests", () => {
  test("adds one and then doubles the value correctly", () => {
    const result = plusOneAndDouble(4);
    expect(result).toBe(10);
  });
});

describe("integration tests", () => {
  test("uses mocked getNumberFromGithub and processes it", () => {
    const githubNumber = getNumberFromGithub();
    const result = doubleValue(plusOne(githubNumber));
    expect(githubNumber).toBe(10); // From the mock
    expect(result).toBe(22); // (10 + 1) * 2
  });
});
