it("should work on custom sort", () => {
  const original = [1, 2, 3, 4, 5];

  const excludedIndexes = [2, 4].map((i) => original.indexOf(i));
  const final = [5, 3, 1];

  const result: number[] = [];

  let i = 0;
  while (i < original.length) {
    if (excludedIndexes.includes(i)) {
      result.push(original[i]);
    } else {
      result.push(final.shift());
    }
    i++;
  }

  const expected = [5, 2, 3, 4, 1];
  expect(result).toEqual(expected);
});
