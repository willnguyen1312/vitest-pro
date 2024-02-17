import { sum } from "./sum";
import { useSum } from "./useSum";

vi.mock("./sum");

beforeEach(() => {
  vi.clearAllMocks();
});

describe("sum module", () => {
  vi.mocked(sum).mockReturnValue(5);
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
