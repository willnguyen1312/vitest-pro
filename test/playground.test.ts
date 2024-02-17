import { vi } from "vitest";
import * as stuff from "./sample.ts";

describe("sample", () => {
  const mockFn = vi.fn(() => 20);

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should pass once", () => {
    mockFn.mockReturnValue(10);
    const input = 1;
    // spy
    const doubleSpy = vi.spyOn(stuff, "double");

    doubleSpy.mockReturnValue(20);

    const output = stuff.double(input);
    expect(output).toEqual(20);

    expect(doubleSpy).toHaveBeenCalledTimes(1);

    expect(mockFn()).toBe(10);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it("should pass twice", () => {
    mockFn();
    const input = 1;
    // spy
    const doubleSpy = vi.spyOn(stuff, "double");

    doubleSpy.mockReturnValue(20);

    const output = stuff.double(input);
    expect(output).toEqual(20);

    expect(doubleSpy).toHaveBeenCalledTimes(1);

    mockFn.mockReturnValue(10);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn()).toBe(10);
  });
});
