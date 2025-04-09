import { describe, vi, it } from "vitest";

let total = 0;
let count = 0;

async function act(callback: Function) {
  // Check if callback is returning a promise
  const result = callback();

  if (result instanceof Promise) {
    console.log("promise");
    await result;
  }

  console.log("applying changes");
  await new Promise((resolve) => setTimeout(resolve, 100));
  total = count;
  return void 0;
}

describe("async", () => {
  const asyncFn = () => {
    Promise.resolve().then(() => {
      console.log("resolve late 1");
      count++;
    });
    Promise.resolve().then(() => {
      console.log("resolve late 2");
      count++;
    });
    return Promise.resolve("ok");
  };

  it("should be ok", async () => {
    await act(asyncFn);

    expect(total).toBe(2);
  });
});
