import { vi } from "vitest";

const obj = {
  getName: () => {
    return "Nam";
  },
};

describe("spy", () => {
  it("should work", () => {
    const spy = vi.spyOn(obj, "getName");
    const result = obj.getName();
    expect(obj.getName()).toBe("Nam");
    expect(spy).toHaveBeenCalled();

    expect(result).toBe("Nam");
  });
});
