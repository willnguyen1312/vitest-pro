import { vi } from "vitest";

it("should work like a closure", () => {
  const useValue = (fn: () => number) => {
    const rerun = fn;
    return { value: fn(), rerun };
  };

  const { value, rerun } = useValue(() => {
    return 1;
  });

  expect(value).toBe(1);

  rerun();

  expect(value).toBe(1);
});

it("should work like a closure two", () => {
  const spiedConsoleLog = vi.spyOn(console, "log");
  const items = [1, 2, 3];

  const transformedItems = items.map((item) => {
    return {
      value: item,
      trigger: () => {
        console.log("triggered ", item);
      },
      triggerAll: () => {
        transformedItems.forEach((item) => item.trigger());
      },
    };
  });

  transformedItems[1].triggerAll();
  expect(spiedConsoleLog).toHaveBeenCalledTimes(3);
  expect(spiedConsoleLog).toHaveBeenNthCalledWith(1, "triggered ", 1);
  expect(spiedConsoleLog).toHaveBeenNthCalledWith(2, "triggered ", 2);
  expect(spiedConsoleLog).toHaveBeenNthCalledWith(3, "triggered ", 3);
});
