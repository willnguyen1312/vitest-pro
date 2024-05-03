import { vi } from "vitest";
import User, { sum } from "../src/sum.ts";

vi.mock("../src/sum.ts");

describe("mock", () => {
  it("should work", () => {
    const mockSum = vi.fn(sum);
    mockSum.mockReturnValue(3);
    expect(mockSum(1, 2)).toBe(3);
  });

  it("should work again", () => {
    vitest.spyOn(User.prototype, "getName").mockReturnValue("Mocked");

    const user = new User("Nam");
    expect(user.getName()).toBe("Mocked");
  });
});
