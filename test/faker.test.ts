import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";

describe("faker", () => {
  it("should be ok", () => {
    const randomNum = faker.number.int({ min: 0, max: 2 });

    expect(randomNum).toBeGreaterThanOrEqual(0);
    expect(randomNum).toBeLessThanOrEqual(2);
  });
});
