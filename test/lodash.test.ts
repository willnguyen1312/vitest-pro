import { sortBy } from "lodash";

const arr = ["/1", "/2", "/3", "/4", "/5", "/6", "/7", "/8", "/9", "/10"];

test("sortBy", () => {
  const sortedArr = sortBy(arr, (item) => {
    const orderNumber = parseInt(item.replace("/", ""));

    return orderNumber;
  });

  //   expect(sortedArr).toEqual([
  //     "/1",
  //     "/10",
  //     "/2",
  //     "/3",
  //     "/4",
  //     "/5",
  //     "/6",
  //     "/7",
  //     "/8",
  //     "/9",
  //   ]);

  expect(sortedArr).toEqual([
    "/1",
    "/2",
    "/3",
    "/4",
    "/5",
    "/6",
    "/7",
    "/8",
    "/9",
    "/10",
  ]);
});
