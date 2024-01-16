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

type Address = {
  postCode: string;
  street: [string, string | undefined];
};

type UserInfo = {
  address: Address;
  previousAddress?: Address;
  callMe: () => void;
};

const data: UserInfo = {
  address: {
    postCode: "SW1P 3PA",
    street: ["20 Deans Yd", undefined],
  },
  callMe: () => {},
};

// Credit to https://dev.to/tipsy_dev/advanced-typescript-reinventing-lodash-get-4fhe
export type GetFieldType<Obj, Path> =
  Path extends `${infer Left}.${infer Right}`
    ? Left extends keyof Obj
      ?
          | GetFieldType<Exclude<Obj[Left], undefined>, Right>
          | Extract<Obj[Left], undefined>
      : undefined
    : Path extends keyof Obj
      ? Obj[Path]
      : undefined;

export function getValue<
  TData,
  TPath extends string,
  TDefault = GetFieldType<TData, TPath>,
>(
  data: TData,
  path: TPath,
  defaultValue?: TDefault
): GetFieldType<TData, TPath> | TDefault {
  const value = path
    .split(".")
    .reduce<
      GetFieldType<TData, TPath>
    >((value, key) => (value as any)?.[key], data as any);

  return value !== undefined ? value : (defaultValue as TDefault);
}

const value = getValue(data, "address.street.1231", () => {});
//    ^?

value();
