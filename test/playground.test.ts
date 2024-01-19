import { vi } from "vitest";
import * as stuff from "./sample.ts";

it("should pass", () => {
  const input = 1;

  // spy
  const doubleSpy = vi.spyOn(stuff, "double");

  doubleSpy.mockReturnValue(20);

  const output = stuff.double(input);
  expect(output).toEqual(20);

  expect(doubleSpy).toHaveBeenCalledTimes(1);
});
