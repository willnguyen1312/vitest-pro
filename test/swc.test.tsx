import { parse } from "@swc/core";
import { test } from "vitest";
import { traverse } from "@babel/core";
import { visit, compat } from "woodpile";

// const { visit } = require('woodpile');
// const { parseSync } = require('@swc/core');

// const ast = parseSync('console.log("Hello, World!")');

// visit(ast, {
//     visit: {
//         // Callbacks with visit${NodeName} will be called recursively for the node
//         visitProgram: (node, self) => {
//             console.log('visitProgram', node);
//         },
//         visitExpr: (node) => {
//             console.log('visitExpr', node);
//         }
//     },
// });

const App = () => {
  return <h1>Hello there</h1>;
};

test("swc should work", async () => {
  const ast = await parse(
    `
  const App = () => {
    return <h1>Hello there</h1>;
  };
  `,
    {
      syntax: "typescript",
      tsx: true,
    }
  );

  //   expect(ast).toMatchInlineSnapshot();

  //   visit(ast, {
  //     visit: {
  //       visitExpr: (node) => {
  //         console.log("visitExpr", node);
  //       },
  //     },
  //   });

  traverse(compat(ast), {
    enter({ node }) {
      if (node.type !== "JSXOpeningElement") {
        return;
      }
      console.log(node);
    },
  });
});
