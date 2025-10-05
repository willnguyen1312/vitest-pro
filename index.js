const first = () => {
  console.log("first");
};

const second = () => {
  console.log("second");
};

const arrs = [first, second];

const filterArrs = arrs.filter((item) => item !== second);

filterArrs.forEach((fn) => fn());

console.log("arrs", arrs.length);
console.log("filterArrs", filterArrs.length);
