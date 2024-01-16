import { O, S } from "ts-toolbelt";

describe("TypeScript", () => {
  it("should work", () => {
    const source: number[] = [1, 2, 3];
    type DataItem = {
      id: number;
      name: string;
      obj: {
        wow: string;
      };
    };

    type DataItems = DataItem[];

    const data = source.map(
      (item) =>
        ({
          id: item,
          name: "name",
          obj: {
            wow: "wow",
          },
        }) satisfies DataItem
    );

    type A = O.Path<DataItems, ["0", "obj"]>;

    type Special = S.Split<"a.b.c", ".">;
  });
});
