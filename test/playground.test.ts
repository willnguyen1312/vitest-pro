import { it } from "vitest";

it("should pass", () => {
  const logLastArg = (...args: any) => {
    const [{ name = "Nam", aha = "Cool" } = {}] = args.slice(-1);

    console.log(`Hello ${name}!`);
    console.log("aha ", aha);
  };

  logLastArg({ aha: "World" });
});
