import { test } from "vitest";
import { vi } from "vitest";

test("late promise", async () => {
  vi.useFakeTimers();
  let done = false;
  const { promise, resolve } = Promise.withResolvers();
  //   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/withResolvers

  setTimeout(() => {
    // Whatever processing
    resolve("done");
    done = true;
  }, 10000);

  vi.runAllTimers();

  await promise;
  expect(done).toBe(true);
});
