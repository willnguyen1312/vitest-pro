import { vi } from "vitest";
import * as stuff from "./sample.ts";

it("should pass", () => {
  const input = 1;

  // spy
  vi.spyOn(stuff, "double");

  const output = stuff.double(input);
  expect(output).toEqual(2);

  expect(stuff.double).toHaveBeenCalledTimes(1);
});
