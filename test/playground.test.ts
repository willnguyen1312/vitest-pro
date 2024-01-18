import { it, vi, expect } from "vitest";

const obj = {
  hi: () => "Hello",
};

it("should pass", () => {
  const spied = vi.spyOn(obj, "hi");

  const result = obj.hi();

  expect(result).toBe("Hello");

  expect(spied).toHaveBeenCalledTimes(1);
});
