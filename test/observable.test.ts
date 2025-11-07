import { test } from "vitest";

import Observable from "zen-observable";

test("observable", async () => {
  let observer;
  const observable = new Observable((_observer) => {
    // Emit a single value after 1 second
    observer = _observer;

    // On unsubscription, cancel the timer
    return () => {};
  });

  observable.subscribe({
    next(value) {
      expect(value).toBe("Hello, Observable!");
    },
  });

  observer.next("Hello, Observable!");
});
