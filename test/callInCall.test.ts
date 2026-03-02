import { test } from "vitest";

const effect = (fn: () => void) => {
  fn();
  console.log("starting effect");
  return () => {
    console.log("stopping effect");
  };
};

test("call in call", async () => {
  const consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  vi.useFakeTimers();
  let stopped = false;

  const stopRunningEffect = effect(() => {
    setTimeout(() => {
      if (stopped) return;
      stopped = true;
      stopRunningEffect();
    }, 2000);
  });
  new Promise((resolve) => setTimeout(resolve, 4000));
  vi.runAllTimers();
  expect(stopped).toBe(true);
  expect(consoleLogSpy).toHaveBeenCalledTimes(2);
  expect(consoleLogSpy).toHaveBeenNthCalledWith(1, "starting effect");
  expect(consoleLogSpy).toHaveBeenNthCalledWith(2, "stopping effect");
  consoleLogSpy.mockRestore();
});
