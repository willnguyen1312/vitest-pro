import { expect, test } from "vitest";

const createGraphQLClient = (options: Record<string, unknown>) => {
  const resolves: Function[] = [];
  return {
    query: async (query: string) => {
      const result = options[query];
      const promise = new Promise<unknown>((resolve) => {
        resolves.push(() => resolve(result));
      });
      return promise;
    },
    resolveAll: async () => {
      for (const resolve of resolves) {
        resolve();
      }
    },
  };
};

test("graphql client", async () => {
  const graphQLClient = createGraphQLClient({
    HelloQuery: "Hello, world!",
  });

  const resultPromise = graphQLClient.query("HelloQuery");
  // Uncomment this line to block the test
  await graphQLClient.resolveAll();
  expect(await resultPromise).toBe("Hello, world!");
});
