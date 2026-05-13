import { describe, it, expect, vi } from "vitest";

describe("try / catch / finally", () => {
  it("runs catch on throw and finally always", () => {
    const order: string[] = [];

    try {
      order.push("try");
      throw new Error("boom");
    } catch (e) {
      order.push("catch");
      expect((e as Error).message).toBe("boom");
    } finally {
      order.push("finally");
    }

    expect(order).toEqual(["try", "catch", "finally"]);
  });

  it("skips catch when nothing throws but still runs finally", () => {
    const order: string[] = [];

    try {
      order.push("try");
    } catch {
      order.push("catch");
    } finally {
      order.push("finally");
    }

    expect(order).toEqual(["try", "finally"]);
  });

  it("runs finally even when try returns early", () => {
    const order: string[] = [];

    function run() {
      try {
        order.push("try");
        return "from-try";
      } finally {
        order.push("finally");
      }
    }

    const result = run();

    expect(result).toBe("from-try");
    expect(order).toEqual(["try", "finally"]);
  });

  it("runs finally even when catch returns early", () => {
    const order: string[] = [];

    function run() {
      try {
        order.push("try");
        throw new Error("boom");
      } catch {
        order.push("catch");
        return "from-catch";
      } finally {
        order.push("finally");
      }
    }

    const result = run();

    expect(result).toBe("from-catch");
    expect(order).toEqual(["try", "catch", "finally"]);
  });

  it("finally return overrides try return", () => {
    function run() {
      try {
        return "from-try";
      } finally {
        // eslint-disable-next-line no-unsafe-finally
        return "from-finally";
      }
    }

    expect(run()).toBe("from-finally");
  });

  it("finally throw overrides caught error", () => {
    function run() {
      try {
        throw new Error("from-try");
      } catch (e) {
        throw new Error("from-catch: " + (e as Error).message);
      } finally {
        // eslint-disable-next-line no-unsafe-finally
        throw new Error("from-finally");
      }
    }

    expect(() => run()).toThrow("from-finally");
  });

  it("works with async try / catch / finally", async () => {
    const order: string[] = [];

    async function run() {
      try {
        order.push("try");
        await Promise.reject(new Error("async boom"));
      } catch (e) {
        order.push("catch");
        expect((e as Error).message).toBe("async boom");
      } finally {
        order.push("finally");
      }
    }

    await run();
    expect(order).toEqual(["try", "catch", "finally"]);
  });

  it("rethrowing in catch still runs finally", () => {
    const cleanup = vi.fn();

    function run() {
      try {
        throw new Error("oops");
      } catch (e) {
        throw new Error("wrapped: " + (e as Error).message);
      } finally {
        cleanup();
      }
    }

    expect(() => run()).toThrow("wrapped: oops");
    expect(cleanup).toHaveBeenCalledOnce();
  });
});
