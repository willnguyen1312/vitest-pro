// import { DividerProps} from "@shopify/polaris";
import { writeFileSync } from "fs";
import ts from "typescript";
import { describe, it } from "vitest";

describe("Polaris test", () => {
  it("should work", () => {
    const ast: any = {};

    // Get AST and find union node
    const program = ts.createProgram(
      [
        "node_modules/@shopify/polaris/build/ts/src/components/Box/Box.d.ts",
        // "node_modules/@shopify/polaris/build/ts/src/index.d.ts",
      ],
      {}
    );

    for (const sourceFile of program.getSourceFiles()) {
      if (
        sourceFile.isDeclarationFile &&
        sourceFile.fileName.includes("@shopify")
      ) {
        // console.log(sourceFile.fileName);
      }
    }

    // Write data to result.json
    const data = { hello: "world" };
    const json = JSON.stringify(data, null, 2);
    writeFileSync("result.json", json);
  });
});
