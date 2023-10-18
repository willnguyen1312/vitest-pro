// import { DividerProps} from "@shopify/polaris";
import ts from "typescript";
import { describe, it } from "vitest";

// members is now ["a", "b", "c"]

// const polarisFile = fs.readFileSync(
//   "node_modules/@shopify/polaris/build/ts/src/components/Divider/Divider.d.ts",
//   "utf8"
// );

// console.log(polarisFile);

describe("Polaris test", () => {
  it("should work", () => {
    const ast: any = {};

    // Get AST and find union node
    const program = ts.createProgram(
      [
        "node_modules/@shopify/polaris/build/ts/src/components/Divider/Divider.d.ts",
      ],
      {}
    );

    for (const sourceFile of program.getSourceFiles()) {
      if (
        sourceFile.isDeclarationFile &&
        sourceFile.fileName.includes("@shopify")
      ) {
        // ts.SyntaxKind.NumberKeyword
        ts.forEachChild(sourceFile, (child) => {
          if (ts.isInterfaceDeclaration(child)) {
            if (child.name.escapedText === "DividerProps") {
              // console.log(child.members[0].type.members[0]);
            }
          }

          // if (ts.isTypeAliasDeclaration(child)) {
          //   if (child.name.escapedText === "ColorBorderAlias") {
          //     console.log(child.type.types.map((type) => type.literal.text));
          //   }
          // }
        });
      }
    }
  });
});
