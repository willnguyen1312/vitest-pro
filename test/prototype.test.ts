it("should work great", () => {
  let obj: any = {
    hello: "world",
  };

  obj.__proto__.hi = "crazy";

  console.log(obj.hi);
});
