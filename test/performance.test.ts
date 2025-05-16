import { test, it } from "vitest";

test("performance", async () => {
  performance.mark("start");

  //   Block 2s
  await new Promise((resolve) => setTimeout(resolve, 500));

  performance.mark("end");
  console.log(performance.measure("test", "start", "end"));
});

it.each([[1, 2, 3]])(`%s`, (...test) => {
  console.log(test);
});
