import { it } from "vitest";

it("try-catch", () => {
  try {
    throw new Error("test");
  } catch {
    expect(true).toBe(true);
  }

  expect.assertions(1);
});
