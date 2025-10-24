import { parse } from "acorn-loose";
import { expect, test } from "vitest";

test.skip("acorn loose", () => {
  expect(parse("1 / * 4 )[2]", { ecmaVersion: 2020 })).toMatchInlineSnapshot(`
    Node {
      "body": [
        Node {
          "end": 7,
          "expression": Node {
            "end": 7,
            "left": Node {
              "end": 4,
              "left": Node {
                "end": 1,
                "raw": "1",
                "start": 0,
                "type": "Literal",
                "value": 1,
              },
              "operator": "/",
              "right": Node {
                "end": 4,
                "name": "✖",
                "start": 4,
                "type": "Identifier",
              },
              "start": 0,
              "type": "BinaryExpression",
            },
            "operator": "*",
            "right": Node {
              "end": 7,
              "raw": "4",
              "start": 6,
              "type": "Literal",
              "value": 4,
            },
            "start": 0,
            "type": "BinaryExpression",
          },
          "start": 0,
          "type": "ExpressionStatement",
        },
        Node {
          "end": 12,
          "expression": Node {
            "elements": [
              Node {
                "end": 11,
                "raw": "2",
                "start": 10,
                "type": "Literal",
                "value": 2,
              },
            ],
            "end": 12,
            "start": 9,
            "type": "ArrayExpression",
          },
          "start": 9,
          "type": "ExpressionStatement",
        },
      ],
      "end": 12,
      "sourceType": "script",
      "start": 0,
      "type": "Program",
    }
  `);
});
