import pc from "picocolors";
import { test } from "vitest";

test("console", () => {
  console.log(pc.bgMagenta(`How are ${pc.italic(`you`)} doing?`));
});
