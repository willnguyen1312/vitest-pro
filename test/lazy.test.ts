import { describe, it } from "vitest";

function polyfillSayHi(value: string) {
  console.log("hi " + value);
}

const polyfills = {
  sayHi: polyfillSayHi,
};

describe.only("lazy initialization", () => {
  it("should work", () => {
    Object.defineProperties(globalThis, {
      sayHi: {
        get() {
          return polyfills.sayHi;
        },
      },
    });

    // globalThis.sayHi("world");

    delete globalThis.fetch;

    console.log(typeof globalThis.fetch);
  });
});
