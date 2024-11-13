test("loop", () => {
  let max = 3;
  let count = 0;

  for (let i = 0; i < max; i++) {
    if (max === 3) {
      max += 1;
    }
    count += 1;
  }

  expect(count).toBe(4);
});
