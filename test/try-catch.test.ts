import { it } from "vitest";

it("try-catch", async () => {
  try {
    throw Promise.resolve("test throw promise");
  } catch (e) {
    const result = await e;
    expect(result).toBe("test throw promise");
  }
});
