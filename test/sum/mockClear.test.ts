import { sum } from "./sum";
import { useSum } from "./useSum";

jest.mock("../src/sum");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("sum module", () => {
  jest.mocked(sum).mockReturnValue(5);
  test("works", () => {
    sum(1, 2);
    expect(sum).toHaveBeenCalledTimes(1);
  });
});

describe("useSum module", () => {
  test("works", () => {
    useSum(1, 2);
    expect(sum).toHaveBeenCalledTimes(1);
  });
});
