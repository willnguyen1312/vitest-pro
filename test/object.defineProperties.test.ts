test("should work with defineProperties", () => {
  const obj: any = {};

  let timesIntercepted = 0;

  // Add interceptors to obj on value property
  Object.defineProperties(obj, {
    value: {
      get() {
        return this._value;
      },
      set(value) {
        timesIntercepted++;
        this._value = value;
      },
    },
  });

  obj.value = 1;
  expect(obj.value).toBe(1);

  obj.value = 2;
  expect(obj.value).toBe(2);

  expect(timesIntercepted).toBe(2);
});
