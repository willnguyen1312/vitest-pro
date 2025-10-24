import { parse } from "acorn";
import { expect, test } from "vitest";

test.skip("acorn loose", () => {
  expect(parse("1 + 1", { ecmaVersion: 2020 })).toMatchInlineSnapshot(`
    Node {
      "body": [
        Node {
          "end": 5,
          "expression": Node {
            "end": 5,
            "left": Node {
              "end": 1,
              "raw": "1",
              "start": 0,
              "type": "Literal",
              "value": 1,
            },
            "operator": "+",
            "right": Node {
              "end": 5,
              "raw": "1",
              "start": 4,
              "type": "Literal",
              "value": 1,
            },
            "start": 0,
            "type": "BinaryExpression",
          },
          "start": 0,
          "type": "ExpressionStatement",
        },
      ],
      "end": 5,
      "sourceType": "script",
      "start": 0,
      "type": "Program",
    }
  `);
});
