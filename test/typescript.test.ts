describe("TypeScript", () => {
  it("should work", () => {
    const source: number[] = [1, 2, 3];
    type DataItem = {
      id: number;
      name: string;
    };

    const data = source.map(
      (item) =>
        ({
          id: item,
          name: "name",
        }) satisfies DataItem
    );
  });
});
