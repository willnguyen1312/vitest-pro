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

it("should work on custom sort", () => {
  type Item = {
    name: string;
    count: number;
  };

  const original: Item[] = [
    { name: "a", count: 1 },
    { name: "b", count: 3 },
    { name: "c", count: 5 },
    { name: "d", count: 2 },
    { name: "e", count: 4 },
  ];

  const sorted = original.toSorted((a, b) => a.count - b.count);

  expect(sorted).toEqual([
    { name: "a", count: 1 },
    { name: "d", count: 2 },
    { name: "b", count: 3 },
    { name: "e", count: 4 },
    { name: "c", count: 5 },
  ]);

  expect(original).toEqual([
    { name: "a", count: 1 },
    { name: "b", count: 3 },
    { name: "c", count: 5 },
    { name: "d", count: 2 },
    { name: "e", count: 4 },
  ]);
});
