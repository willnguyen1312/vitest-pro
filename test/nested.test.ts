describe("mock", () => {
  let a = 0;
  beforeEach(() => {
    a = 10;
    console.log("beforeEach");
  });
  it("should work", () => {
    expect(a).toBe(10);
  });

  describe("nested", () => {
    beforeEach(() => {
      a = 20;
    });
    it("should work as well", () => {
      expect(a).toBe(20);
    });
  });
});
