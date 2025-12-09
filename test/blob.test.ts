import { test } from "vitest";

test("blob test placeholder", () => {
  // Placeholder for blob tests
  //   Blob contains another blob tests

  const blob1 = new Blob(["Hello, "], { type: "text/plain" });
  const blob2 = new Blob(["world!"], { type: "text/plain" });
  const combinedBlob = new Blob([blob1, blob2], { type: "audio/wav" });

  //   Read combinedBlob content
  const reader = new FileReader();
  reader.onload = () => {
    const text = reader.result;
    console.log(text); // Should output: "Hello, world!"
  };
  reader.readAsText(combinedBlob);
});
