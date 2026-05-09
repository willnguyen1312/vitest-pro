import { describe, it, expect, vi } from "vitest";
import { memoizeByObject, createViewCounter } from "./weakmap";

describe("memoizeByObject", () => {
  it("calls the underlying fn only once per unique object", () => {
    const expensive = vi.fn((user: { id: string }) => `hello ${user.id}`);
    const memoized = memoizeByObject(expensive);

    const alice = { id: "alice" };

    expect(memoized(alice)).toBe("hello alice");
    expect(memoized(alice)).toBe("hello alice");
    expect(memoized(alice)).toBe("hello alice");

    expect(expensive).toHaveBeenCalledTimes(1);
  });

  it("treats different object instances as different keys, even with the same shape", () => {
    const expensive = vi.fn((user: { id: string }) => Math.random());
    const memoized = memoizeByObject(expensive);

    const aliceA = { id: "alice" };
    const aliceB = { id: "alice" }; // structurally equal, but a different object

    const a = memoized(aliceA);
    const b = memoized(aliceB);

    expect(a).not.toBe(b);
    expect(expensive).toHaveBeenCalledTimes(2);
  });

  it("caches falsy results too (does not recompute when the result is undefined/null/0)", () => {
    const expensive = vi.fn(() => undefined);
    const memoized = memoizeByObject(expensive);

    const obj = {};
    memoized(obj);
    memoized(obj);
    memoized(obj);

    expect(expensive).toHaveBeenCalledTimes(1);
  });

  it("does not mutate the input object", () => {
    const memoized = memoizeByObject((u: { id: string }) => u.id.toUpperCase());

    const alice = { id: "alice" };
    memoized(alice);

    expect(Object.keys(alice)).toEqual(["id"]);
    expect(alice).toEqual({ id: "alice" });
  });

  it("rejects non-object keys at the type level (runtime sanity check)", () => {
    const memoized = memoizeByObject((x: { v: number }) => x.v * 2);

    // @ts-expect-error — primitives can't be WeakMap keys
    expect(() => memoized("nope")).toThrow();
  });
});

describe("createViewCounter (private metadata via WeakMap)", () => {
  it("tracks counts per object identity without mutating the object", () => {
    const counter = createViewCounter<{ title: string }>();

    const post = { title: "Why WeakMap?" };
    const other = { title: "Other post" };

    expect(counter.get(post)).toBe(0);

    expect(counter.record(post)).toBe(1);
    expect(counter.record(post)).toBe(2);
    expect(counter.record(other)).toBe(1);

    expect(counter.get(post)).toBe(2);
    expect(counter.get(other)).toBe(1);

    // The post object stays clean — no hidden fields were added.
    expect(Object.keys(post)).toEqual(["title"]);
  });

  it("isolates state between counter instances", () => {
    const counterA = createViewCounter<{ id: string }>();
    const counterB = createViewCounter<{ id: string }>();

    const item = { id: "x" };

    counterA.record(item);
    counterA.record(item);

    expect(counterA.get(item)).toBe(2);
    expect(counterB.get(item)).toBe(0);
  });
});
