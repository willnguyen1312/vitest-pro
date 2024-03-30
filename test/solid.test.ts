import { createSignal, createComputed, createMemo } from "solid-js";

it("should work", async () => {
  const [state, setState] = createSignal(1);

  const memo = createMemo(() => state() * 2);

  expect(state()).toBe(1);
  expect(memo()).toBe(2);
});
