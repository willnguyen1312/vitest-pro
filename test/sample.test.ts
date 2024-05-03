it("should work conditionally", () => {
  const callMe = vi.fn().mockImplementation((config) => {
    const { name } = config;

    if (name === "Nam") {
      return "Hello Nam";
    }

    return "Hello Stranger";
  });

  expect(callMe({ name: "Nam" })).toBe("Hello Nam");

  expect(callMe({ name: "Stranger" })).toBe("Hello Stranger");

  expect(callMe).toHaveBeenCalledTimes(2);
});
