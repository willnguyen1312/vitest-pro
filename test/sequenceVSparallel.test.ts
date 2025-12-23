import { test } from "vitest";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const makePromise = (value: number) => {
  return sleep(value).then(() => value);
};

test.only("sequence", async () => {
  console.time("sequence");
  const valuesTobePromisified = [2000, 1000, 500];

  for (const p of valuesTobePromisified) {
    const value = await makePromise(p);
    console.log(value);
  }

  console.timeEnd("sequence");
});

test("parallel", async () => {
  console.time("parallel");
  const valuesTobePromisified = [2000, 1000, 500];

  await Promise.all(
    valuesTobePromisified.map(async (p) => {
      const value = await makePromise(p);
      console.log(value);
    })
  );

  console.timeEnd("parallel");
});
