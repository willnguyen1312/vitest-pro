import { test } from "vitest";

test("reference", () => {
  let value: string = "";
  const func = () => {
    value = "Hello";
  };

  const ref = {
    current: func,
  };

  const callLater = (reference: typeof ref) => () => {
    reference.current();
  };

  const call = callLater(ref);

  ref.current = () => {
    value = "Hello World";
  };

  call();

  expect(value).toBe("Hello World");
});
