import { describe, it, expect } from "vitest";

function syncThrow() {
  throw new Error("sync error");
}

async function asyncThrow() {
  return Promise.reject(new Error("async error"));
}

describe.only("throw", () => {
  it("should work", async () => {
    expect(() => syncThrow()).toThrow("sync error");
    expect(await asyncThrow().catch((e) => e.message)).toBe("async error");
    expect(asyncThrow()).rejects.toThrow("async error");
    expect(asyncThrow()).rejects.toThrowError(new Error("async error"));
  });
});
