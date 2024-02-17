import { sum } from "./sum";
import { useSum } from "./useSum";

vi.mock("./sum");

describe("sum module", () => {
  test("works", () => {
    vi.mocked(sum).mockReturnValue(5);
    expect(sum(1, 2)).toBe(5);
  });
});

describe("useSum module", () => {
  test("works", () => {
    vi.mocked(sum).mockReturnValue(30);
    expect(useSum(1, 2)).toBe(30);
  });
});
