import { describe, vi, it } from "vitest";

describe("async", () => {
  const asyncFn = async () => {
    // Promise.resolve().then(() => {
    //   console.log("resolve late");
    // });

    new Promise((resolve) => {
      console.log("new promise");
      setTimeout(() => {
        console.log("resolve");
        resolve(void 0);
      }, 1000);
    });

    console.log("end");
    return "ok";
  };

  it("should be ok", async () => {
    vi.useFakeTimers();
    await asyncFn();
    console.log("done");
    await vi.runAllTimersAsync();
    // expect(result).toBe("ok");
  });
});
