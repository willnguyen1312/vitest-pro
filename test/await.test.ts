import { expect, test } from "vitest";

const createGraphQLClient = (options: Record<string, unknown>) => {
  const resolves: Set<() => Promise<unknown>> = new Set();
  return {
    query: async (query: string) => {
      const result = options[query];
      const promise = new Promise<unknown>((resolve) => {
        resolves.add(async () => resolve(result));
      });
      return promise;
    },
    resolveAll: async () => {
      await Promise.all(Array.from(resolves).map((resolve) => resolve()));
      resolves.clear();
    },
  };
};

test("graphql client multiple calls", async () => {
  const graphQLClient = createGraphQLClient({
    HelloQuery: "Hello, world!",
    HiQuery: "Hi, world!",
  });

  const callMe = async () => {
    const helloResult = await graphQLClient.query("HelloQuery");

    const hiResult = await graphQLClient.query("HiQuery");

    return {
      helloResult,
      hiResult,
    };
  };

  const callMePromise = callMe();

  await graphQLClient.resolveAll();
  await graphQLClient.resolveAll();

  const result = await callMePromise;

  expect(result.helloResult).toBe("Hello, world!");
  expect(result.hiResult).toBe("Hi, world!");
});
