import { signal, batch, computed, effect } from "@preact/signals-core";

describe("signal", () => {
  it("should work as expected", () => {
    const consoleSpied = vi.spyOn(console, "log").mockImplementation(() => {});
    const countSignal = signal(0);

    effect(() => {
      console.log("effect", countSignal.value);
    });

    batch(() => {
      countSignal.value += 1;
      countSignal.value += 1;
      countSignal.value += 1;
      countSignal.value += 1;
    });

    expect(countSignal.value).toBe(4);
    expect(consoleSpied).toHaveBeenCalledTimes(2);
  });
});
