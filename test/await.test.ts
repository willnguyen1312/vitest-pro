import { expect, test } from "vitest";

const createGraphQLClient = (options: Record<string, unknown>) => {
  const resolves: (() => Promise<unknown>)[] = [];
  return {
    query: async (query: string) => {
      const result = options[query];
      const promise = new Promise<unknown>((resolve) => {
        resolves.push(async () => resolve(result));
      });
      return promise;
    },
    resolveAll: async () => {
      for (const resolve of resolves) {
        await resolve();
      }
    },
  };
};

test("graphql client single call", async () => {
  const graphQLClient = createGraphQLClient({
    HelloQuery: "Hello, world!",
  });

  const resultPromise = graphQLClient.query("HelloQuery");
  // Comment the line below to block the test
  await graphQLClient.resolveAll();
  expect(await resultPromise).toBe("Hello, world!");
});

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
