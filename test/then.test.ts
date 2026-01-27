const makeSomethingResolve = () => {
  const then = (onFulfilled: (value: any) => any) => {
    return onFulfilled(100);
  };
  return {
    get then() {
      return then;
    },
  };
};

const makeSomethingReject = () => {
  const then = (_: any, onRejected: (reason: any) => any) => {
    return onRejected(new Error("test"));
  };

  return {
    get then(): (
      onFulfilled: (value: any) => any,
      onRejected: (reason: any) => any,
    ) => any {
      return then;
    },
  };
};

it("works for then", async () => {
  const result = await makeSomethingResolve();
  expect(result).toBe(100);

  try {
    await makeSomethingReject();
  } catch (error) {
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe("test");
  }
});
