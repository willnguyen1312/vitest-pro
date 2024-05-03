it("should work", () => {
  const regex = /^(?!monorail)([a-z0-9]+)$/i;

  expect("monorail".match(regex)).toBeNull();
});
