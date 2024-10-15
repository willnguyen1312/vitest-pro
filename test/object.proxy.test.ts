test("should work with proxy", () => {
  const obj: any = {};
  let timesIntercepted = 0;

  const handler = {
    get(target, prop) {
      return Reflect.get(target, prop);
    },
    set(target, prop, value) {
      if (prop === "value") {
        timesIntercepted++;
      }
      Reflect.set(target, prop, value);
      return true;
    },
  };

  const proxy = new Proxy(obj, handler);

  proxy.value = 1;
  expect(proxy.value).toBe(1);

  proxy.value = 2;
  expect(proxy.value).toBe(2);

  expect(timesIntercepted).toBe(2);
});
