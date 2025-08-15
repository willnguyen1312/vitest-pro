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

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

test("loops with await", async () => {
  // Spy on console.log
  const consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});

  vi.useFakeTimers();
  const waitTimes = [4000, 3000, 2000];

  const promises = Promise.all(
    waitTimes.map(async (waitTime) => {
      await sleep(waitTime);
      console.log(`waited for ${waitTime}ms`);
    })
  );

  vi.runAllTimers();

  await promises;

  expect(consoleLogSpy).toHaveBeenCalledTimes(3);
  expect(consoleLogSpy).toHaveBeenNthCalledWith(1, "waited for 2000ms");
  expect(consoleLogSpy).toHaveBeenNthCalledWith(2, "waited for 3000ms");
  expect(consoleLogSpy).toHaveBeenNthCalledWith(3, "waited for 4000ms");

  vi.useRealTimers();
  console.log("before restored");
  consoleLogSpy.mockRestore();
  console.log("after restored");
});
