import { test } from "vitest";

test("performance", async () => {
  performance.mark("start");

  //   Block 2s
  await new Promise((resolve) => setTimeout(resolve, 500));

  performance.mark("end");
  console.log(performance.measure("test", "start", "end"));
});
