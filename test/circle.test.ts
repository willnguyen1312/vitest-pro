import { describe, it } from "vitest";

const useStuff = ({ callMe }: { callMe: Function }) => {
  return {
    greet: () => {
      console.log("greet");
    },
    submit: () => callMe(),
  };
};

describe("circle", () => {
  it("should calculate the area of a circle", () => {
    const { submit, greet } = useStuff({
      callMe: () => {
        console.log("callMe");
        greet();
      },
    });
    submit();
  });
});
