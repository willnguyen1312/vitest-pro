import { expect, test } from "vitest";

test("await", async () => {
  let resolver: Function;

  const promise = new Promise<void>((resolve) => {
    resolver = resolve;
  });

  // Uncomm the promise to block the test
  resolver();

  await promise;
  console.log("done");
});
