const createFunction = () => {
  return function Voice() {
    console.log("Hello");
  };
};

// it("works as function call", () => {
//   const voice = createFunction();
//   voice();
// });

it("works as new call", () => {
  const Voice = createFunction();
  new Voice();
});
