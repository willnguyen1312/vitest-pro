import { it } from "vitest";

it("should pass", () => {
  const pre = Array(3);

  const arr = pre.map(() => {
    console.log("map");
  });

  console.log(arr);

  // expect(arr).toMatchInlineSnapshot(`
  //   [
  //     ,
  //     ,
  //     ,
  //   ]
  // `);

  // arr[0][0] = 1;

  // expect(arr).toMatchInlineSnapshot(`
  //   [
  //     [
  //       1,
  //       null,
  //       null,
  //     ],
  //     [
  //       null,
  //       null,
  //       null,
  //     ],
  //     [
  //       null,
  //       null,
  //       null,
  //     ],
  //   ]
  // `);
});
