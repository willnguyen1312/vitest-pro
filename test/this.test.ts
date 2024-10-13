it("works for this", () => {
  function Effect(this, fn: () => unknown) {
    this._fn = fn;
  }

  Effect.prototype._callback = function () {
    this._fn();
  };

  function effect(fun) {
    const a = new Effect(fun);
    a._callback();
  }

  let updater!: typeof Effect;
  effect(function (this) {
    updater = this;
  });

  expect(updater).toBeInstanceOf(Effect);
});
