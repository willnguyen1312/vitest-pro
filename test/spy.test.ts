import { vi } from "vitest";

const obj = {
  getName: () => {
    return "Nam";
  },
};

const callMeBaby = () => "Call me baby";

describe("spy", () => {
  it("should work", () => {
    const spy = vi.spyOn(obj, "getName");
    const result = obj.getName();
    expect(obj.getName()).toBe("Nam");
    expect(spy).toHaveBeenCalledTimes(2);

    expect(result).toBe("Nam");
  });

  it("should work with callMeBaby", () => {
    const spy = vi.fn(callMeBaby);
    expect(spy()).toBe("Call me baby");
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
