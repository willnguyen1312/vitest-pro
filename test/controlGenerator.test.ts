import { test } from "vitest";
import { vi } from "vitest";

let count = 0;

async function* createAsyncGenerator() {
  console.log("Generator started");
  let input = 0;
  while (true) {
    const value = yield input * 2;
    input = value;
  }
}

const createGenerator = () => {
  const generator = createAsyncGenerator();
  console.log("Async generator created");
  generator.next(); // Start the generator yet ignoring the returned promise
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncGenerator/next#sending_values_to_the_generator

  return {
    async run(input: number) {
      const result = await generator.next(input);
      return result.value;
    },
  };
};

test("late generator", async () => {
  const generator = createGenerator();

  expect(await generator.run(1312)).toBe(2624);
  expect(await generator.run(10)).toBe(20);
  expect(await generator.run(104)).toBe(208);
});
