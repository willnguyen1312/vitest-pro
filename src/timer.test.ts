import { vi, test, expect } from "vitest";

test("timer works", async () => {
  vi.useFakeTimers();

  let called = false;
  setTimeout(() => {
    called = true;
  }, 1000);

  // Fast-forward time
  await vi.runAllTimersAsync();

  expect(called).toBe(true);

  vi.useRealTimers();
});
