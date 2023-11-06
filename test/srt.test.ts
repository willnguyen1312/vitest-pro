import fs from "fs";
import { it } from "vitest";

import { parseSync, stringifySync } from "subtitle";

// inputStream.pipe(parse()).pipe(stringify({ format: 'WebVTT' }))

it("should pass", () => {
  const input = fs.readFileSync("./input.srt", "utf8");

  const parsedData = parseSync(input);

  //   console.log(parsedData);

  const updatedData = parsedData.map((item: any) => {
    item.data.start += 49000;
    item.data.end += 49000;
    return item;
  });

  const response = stringifySync(updatedData, { format: "SRT" });

  //   console.log(response);

  fs.writeFileSync("./output.srt", response, "utf8");
});
