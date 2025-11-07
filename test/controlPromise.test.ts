import { test } from "vitest";
import { vi } from "vitest";

test("late promise", async () => {
  vi.useFakeTimers();
  let resolve: (value: unknown) => void;
  const promise = new Promise((res) => {
    resolve = res;
  });

  setTimeout(() => {
    resolve("done");
  }, 3000);

  vi.runAllTimers();

  await promise;
  console.log("Promise resolved");
});
