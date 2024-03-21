it("work great", () => {
  function run(input = 1) {
    outer: if (input) {
      break outer;
    } else {
      return 0;
    }

    return 1000;
  }

  expect(run(1)).toBe(1000);
});
