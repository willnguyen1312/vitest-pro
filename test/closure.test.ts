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
