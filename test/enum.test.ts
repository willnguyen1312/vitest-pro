import { describe, expect, it } from "vitest";

enum Direction {
  Up,
  Down,
  Left,
  Right,
}

enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
}

enum Mixed {
  No = 0,
  Yes = "YES",
}

const getEnumKeys = (enumObject: object): string[] =>
  Object.keys(enumObject).filter((key) => Number.isNaN(Number(key)));

const isString = (value: unknown): boolean => typeof value === "string";

describe("enumerable keys of an enum", () => {
  it("compiles a numeric enum into a double-sided object", () => {
    expect(Direction).toEqual({
      "0": "Up",
      "1": "Down",
      "2": "Left",
      "3": "Right",
      Up: 0,
      Down: 1,
      Left: 2,
      Right: 3,
    });
  });

  it("leaks the reverse mapping through Object.keys, numeric keys first", () => {
    expect(Object.keys(Direction)).toEqual([
      "0",
      "1",
      "2",
      "3",
      "Up",
      "Down",
      "Left",
      "Right",
    ]);
  });

  it("yields only member names once number-like keys are filtered out", () => {
    expect(getEnumKeys(Direction)).toEqual(["Up", "Down", "Left", "Right"]);
  });

  it("builds no reverse mapping for a string enum", () => {
    expect(Status).toEqual({ Active: "ACTIVE", Inactive: "INACTIVE" });
    expect(Object.keys(Status)).toEqual(["Active", "Inactive"]);
  });

  it("yields member names for a string enum through the same filter", () => {
    expect(getEnumKeys(Status)).toEqual(["Active", "Inactive"]);
  });

  it("reverse-maps only the numeric member of a heterogeneous enum", () => {
    expect(Mixed).toEqual({ "0": "No", No: 0, Yes: "YES" });
    expect(getEnumKeys(Mixed)).toEqual(["No", "Yes"]);
  });
});

describe("filtering values instead of keys", () => {
  it("returns member names for a numeric enum by coincidence", () => {
    expect(Object.values(Direction).filter(isString)).toEqual([
      "Up",
      "Down",
      "Left",
      "Right",
    ]);
  });

  it("returns member values rather than names for a string enum", () => {
    expect(Object.values(Status).filter(isString)).toEqual([
      "ACTIVE",
      "INACTIVE",
    ]);
  });

  it("mixes one name and one value for a heterogeneous enum", () => {
    expect(Object.values(Mixed).filter(isString)).toEqual(["No", "YES"]);
  });
});

describe("keyof typeof as the type-level counterpart", () => {
  it("excludes the reverse mapping, matching the filtered runtime keys", () => {
    type DirectionKey = keyof typeof Direction;

    const declaredKeys: DirectionKey[] = ["Up", "Down", "Left", "Right"];

    expect(getEnumKeys(Direction)).toEqual(declaredKeys);
  });
});
