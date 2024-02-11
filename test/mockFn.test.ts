import { test, vi } from "vitest";

test("mockFn", () => {
  const fn = vi.fn();

  const aha = () => {};
  const waka = "waka";

  fn({
    aha,
    waka,
  });

  expect(fn).toBeCalledWith(expect.objectContaining({ aha, waka }));
});
