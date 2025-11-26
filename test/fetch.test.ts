import { test } from "vitest";
import axios from "axios";

test("fetch", async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos/1000"
  );
  expect(response.status).toBe(404);
});

test("axios", async () => {
  try {
    await axios.get("https://jsonplaceholder.typicode.com/todos/1000");
  } catch (error) {
    const isAxiosError = axios.isAxiosError(error);
    if (isAxiosError) {
      expect(error.status).toBe(404);
    }
  }
});
