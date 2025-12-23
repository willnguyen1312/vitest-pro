import PQueue from "p-queue";
import got from "got";
import { test } from "vitest";

const queue = new PQueue({ concurrency: 2 });

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

test("async queue", async () => {
  console.time("async queue");
  (async () => {
    await queue.add(async () => sleep(1000));
    console.log("Done: 1000ms");
  })();

  (async () => {
    await queue.add(async () => sleep(2000));
    console.log("Done: 2000ms");
  })();

  await queue.onIdle();
  console.timeEnd("async queue");
});
