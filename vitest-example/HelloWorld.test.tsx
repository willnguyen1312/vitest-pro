import { expect, test } from "vitest";
import { render } from "@solidjs/testing-library";
import HelloWorld from "./HelloWorld.jsx";

test("renders name", async () => {
  const { getByText } = render(() => <HelloWorld name="Vitest" />);
  await expect.element(getByText("Hello Vitest!")).toBeInTheDocument();
});
