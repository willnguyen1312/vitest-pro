// NO check typescript for this file
// @ts-nocheck
import React from "react";
import Fetch from "./Fetch";
import {
  render,
  fireEvent,
  cleanup,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";

afterEach(cleanup);

test("starts without any joke", () => {
  const { queryByTestId } = render(<Fetch />);
  expect(queryByTestId("fetch-joke")).toBeNull();
});

test("when clicking on button, displays loading message", () => {
  const { getByTestId, getByText } = render(<Fetch />);
  fireEvent.click(getByText("Get a Chuck Norris joke"));
  expect(getByTestId("fetch-loading").textContent).toBe("Loading...");
});

test("when clicking on button displays joke if API succeeds", async () => {
  // Mock API
  vi.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      status: 200,
      json: () =>
        Promise.resolve({
          value: "Chuck Norris counted to infinity. Twice.",
        }),
    }),
  );

  const { getByTestId, getByText } = render(<Fetch />);
  fireEvent.click(getByText("Get a Chuck Norris joke"));

  await waitForElementToBeRemoved(() => getByTestId("fetch-loading"));
  await waitFor(() => getByTestId("fetch-joke"));

  expect(getByTestId("fetch-joke").textContent).toBe(
    "Chuck Norris counted to infinity. Twice.",
  );
  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch.mock.calls[0][0]).toBe(
    "https://api.chucknorris.io/jokes/random",
  );

  // Clear mock
  global.fetch.mockClear();
});

test("when clicking on button displays error if API fails", async () => {
  // Mock API
  vi.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      status: 500,
    }),
  );

  const { getByTestId, getByText } = render(<Fetch />);
  fireEvent.click(getByText("Get a Chuck Norris joke"));
  await waitFor(() => getByTestId("fetch-error"));

  expect(getByTestId("fetch-error").textContent).toBe("Failed to fetch");
  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch.mock.calls[0][0]).toBe(
    "https://api.chucknorris.io/jokes/random",
  );

  // Clear mock
  global.fetch.mockClear();
});
