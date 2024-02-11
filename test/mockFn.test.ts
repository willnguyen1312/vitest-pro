import { test, vi } from "vitest";

test("mockFn", () => {
  const fn = vi.fn();

  const aha = () => {};

  fn({
    aha,
  });

  expect(fn).toBeCalledWith({
    aha,
  });
});
