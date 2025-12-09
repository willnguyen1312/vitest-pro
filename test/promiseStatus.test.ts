import { describe, it } from "vitest";

function promiseState(p) {
  const t = {};
  return Promise.race([p, t]).then(
    (v) => (v === t ? "pending" : "fulfilled"),
    () => "rejected",
  );
}

var a = Promise.resolve();
// var b = Promise.reject();
var c = new Promise(() => {});

// promiseState(a).then((state) => console.log(state)); // fulfilled
// promiseState(b).then((state) => console.log(state)); // rejected
// promiseState(c).then((state) => console.log(state)); // pending

describe("promiseState", () => {
  it('should return "fulfilled" for a resolved promise', async () => {
    const state = await promiseState(a);
    expect(state).toBe("fulfilled");
  });
});
