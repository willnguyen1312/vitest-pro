import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

it("should work great", async () => {
  render(<App />);
  const user = userEvent.setup();
  const button = screen.getByRole("button");

  await user.click(button);
  expect(screen.getByText("Hello World")).toBeInTheDocument();
  expect(await screen.findByText("Clicked 1 times")).toBeInTheDocument();
});
