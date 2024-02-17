import * as sumModule from "./sum";
import { useSum } from "./useSum";

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("sum module", () => {
  test("works", () => {
    expect(sumModule.sum(1, 2)).toBe(3);

    vi.spyOn(sumModule, "sum").mockImplementation(() => 5);
    expect(sumModule.sum(1, 2)).toBe(5);
    expect(sumModule.sum).toHaveBeenCalledTimes(1);
  });
});

describe("useSum module", () => {
  test("works", () => {
    expect(useSum(1, 2)).toBe(3);

    vi.spyOn(sumModule, "sum").mockImplementation(() => 5);
    expect(useSum(1, 2)).toBe(5);
    expect(sumModule.sum).toHaveBeenCalledTimes(1);
  });
});
