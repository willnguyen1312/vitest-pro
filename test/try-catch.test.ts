import { it } from "vitest";

it("try-catch", async () => {
  try {
    throw Promise.resolve("test throw promise");
  } catch (e) {
    const result = await e;
    expect(result).toBe("test throw promise");
  }
});

it("try-finally", () => {
  function run(callBack) {
    try {
      return callBack();
    } finally {
      // console.log("finally");
    }
  }

  console.log(
    run(() => {
      // console.log("try");

      return 1;
    })
  );
});
