import { describe, expect, test } from "vitest";

interface Operation<T = unknown> {
  name: string;
  resolve: (value: T) => void;
  promise: Promise<T>;
}

function createClient() {
  const operations: Operation[] = [];

  function query<T>(name: string): Promise<T> {
    let resolve!: (value: T) => void;
    const promise = new Promise<T>((r) => {
      resolve = r;
    });
    operations.push({ name, resolve: resolve as (v: unknown) => void, promise });
    return promise;
  }

  async function resolveAll() {
    const pending = operations.filter((op) => !("settled" in op));
    for (const op of pending) {
      (op as Operation & { settled?: boolean }).settled = true;
      op.resolve(`${op.name}-result`);
    }
    await Promise.resolve();
    await Promise.resolve();
  }

  return { operations, query, resolveAll };
}

async function flushOps(client: ReturnType<typeof createClient>) {
  let before = -1;
  while (before !== client.operations.length) {
    before = client.operations.length;
    await client.resolveAll();
  }
}

describe("flushOps cascade", () => {
  test("single resolveAll() leaves a cascading follow-up call pending", async () => {
    const client = createClient();

    const mutation = client.query<string>("mutation");
    mutation.then(() => {
      client.query<string>("refetch");
    });

    expect(client.operations).toHaveLength(1);

    await client.resolveAll();

    expect(client.operations).toHaveLength(2);
    expect("settled" in client.operations[1]).toBe(false);
  });

  test("flushOps drains the entire cascade", async () => {
    const client = createClient();

    client.query<string>("mutation").then(() => {
      client.query<string>("refetch");
    });

    await flushOps(client);

    expect(client.operations).toHaveLength(2);
    expect(client.operations.every((op) => "settled" in op)).toBe(true);
  });

  test("flushOps handles arbitrary depth", async () => {
    const client = createClient();

    client.query<string>("a").then(() => {
      client.query<string>("b").then(() => {
        client.query<string>("c");
      });
    });

    await flushOps(client);

    expect(client.operations.map((op) => op.name)).toEqual(["a", "b", "c"]);
    expect(client.operations.every((op) => "settled" in op)).toBe(true);
  });

  test("flushOps exits in one round when there is no cascade", async () => {
    const client = createClient();

    client.query<string>("standalone");

    let rounds = 0;
    const originalResolveAll = client.resolveAll;
    client.resolveAll = async () => {
      rounds++;
      await originalResolveAll();
    };

    await flushOps(client);

    expect(rounds).toBe(1);
  });

  test("a setTimeout-deferred follow-up escapes flushOps (the failure mode)", async () => {
    const client = createClient();

    client.query<string>("mutation").then(() => {
      setTimeout(() => {
        client.query<string>("late-refetch");
      }, 0);
    });

    await flushOps(client);

    expect(client.operations.map((op) => op.name)).toEqual(["mutation"]);
  });
});
