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
  function run() {
    try {
      return { a: 1 };
    } finally {
      console.log("finally");
    }
  }

  console.log(run());
});
