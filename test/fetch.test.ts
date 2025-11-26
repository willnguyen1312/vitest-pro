import { test } from "vitest";
import ky from "ky";
import axios from "axios";

const invalid404Url = "https://jsonplaceholder.typicode.com/todos/1000";

test("fetch", async () => {
  const response = await fetch(invalid404Url);
  expect(response.status).toBe(404);
  expect.assertions(1);
});

test("axios", async () => {
  try {
    await axios.get(invalid404Url);
  } catch (error) {
    const isAxiosError = axios.isAxiosError(error);
    if (isAxiosError) {
      expect(error.status).toBe(404);
    }
  }

  expect.assertions(1);
});

test("ky", async () => {
  try {
    await ky.get(invalid404Url);
  } catch (error) {
    expect(error.response.status).toBe(404);

    // const isAxiosError = axios.isAxiosError(error);
    // if (isAxiosError) {
    //   expect(error.status).toBe(404);
    // }
  }
  expect.assertions(1);
});
