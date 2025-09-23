import pc from "picocolors";
import { test } from "vitest";
import { equal } from "@wry/equality";

const firstCausalError = new Error("UseLazyQueryError");
const secondCausalError = new Error("UseLazyQueryError");

const first = {
  fetchPolicy: "cache-and-network",
  variables: {
    variants: [
      {
        variantId: "gid://shopify/ProductVariant/46270575313140",
        quantity: 1,
      },
      {
        variantId: "gid://shopify/ProductVariant/46144608207092",
        quantity: 1,
      },
      {
        variantId: "",
        quantity: 1,
      },
    ],
  },
  context: {
    causalError: firstCausalError,
  },
  query: {
    kind: "Document",
    definitions: [
      {
        kind: "OperationDefinition",
        operation: "query",
        name: {
          kind: "Name",
          value: "ShippingRecommendedPackageForVariants",
        },
        variableDefinitions: [
          {
            kind: "VariableDefinition",
            variable: {
              kind: "Variable",
              name: {
                kind: "Name",
                value: "variants",
              },
            },
            type: {
              kind: "NonNullType",
              type: {
                kind: "ListType",
                type: {
                  kind: "NonNullType",
                  type: {
                    kind: "NamedType",
                    name: {
                      kind: "Name",
                      value: "ProductVariantsRecommendationInput",
                    },
                  },
                },
              },
            },
            directives: [],
          },
        ],
        directives: [],
        selectionSet: {
          kind: "SelectionSet",
          selections: [
            {
              kind: "Field",
              name: {
                kind: "Name",
                value: "shippingRecommendedPackageForVariants",
              },
              arguments: [
                {
                  kind: "Argument",
                  name: {
                    kind: "Name",
                    value: "variants",
                  },
                  value: {
                    kind: "Variable",
                    name: {
                      kind: "Name",
                      value: "variants",
                    },
                  },
                },
              ],
              directives: [],
              selectionSet: {
                kind: "SelectionSet",
                selections: [
                  {
                    kind: "Field",
                    name: {
                      kind: "Name",
                      value: "id",
                    },
                    arguments: [],
                    directives: [],
                  },
                  {
                    kind: "Field",
                    name: {
                      kind: "Name",
                      value: "__typename",
                    },
                    arguments: [],
                    directives: [],
                  },
                ],
              },
            },
          ],
        },
      },
    ],
    loc: {
      start: 0,
      end: 167,
      source: {
        name: "GraphQL request",
        locationOffset: {
          line: 1,
          column: 1,
        },
      },
    },
    id: "0c26700219ba38f6cdfe69b98378c43dcf822854af7df49dc560aa1259c00d5b",
  },
};

const second = {
  fetchPolicy: "cache-and-network",
  variables: {
    variants: [
      {
        variantId: "gid://shopify/ProductVariant/46270575313140",
        quantity: 1,
      },
      {
        variantId: "gid://shopify/ProductVariant/46144608207092",
        quantity: 1,
      },
      {
        variantId: "",
        quantity: 1,
      },
    ],
  },
  context: {
    causalError: secondCausalError,
  },
  query: {
    kind: "Document",
    definitions: [
      {
        kind: "OperationDefinition",
        operation: "query",
        name: {
          kind: "Name",
          value: "ShippingRecommendedPackageForVariants",
        },
        variableDefinitions: [
          {
            kind: "VariableDefinition",
            variable: {
              kind: "Variable",
              name: {
                kind: "Name",
                value: "variants",
              },
            },
            type: {
              kind: "NonNullType",
              type: {
                kind: "ListType",
                type: {
                  kind: "NonNullType",
                  type: {
                    kind: "NamedType",
                    name: {
                      kind: "Name",
                      value: "ProductVariantsRecommendationInput",
                    },
                  },
                },
              },
            },
            directives: [],
          },
        ],
        directives: [],
        selectionSet: {
          kind: "SelectionSet",
          selections: [
            {
              kind: "Field",
              name: {
                kind: "Name",
                value: "shippingRecommendedPackageForVariants",
              },
              arguments: [
                {
                  kind: "Argument",
                  name: {
                    kind: "Name",
                    value: "variants",
                  },
                  value: {
                    kind: "Variable",
                    name: {
                      kind: "Name",
                      value: "variants",
                    },
                  },
                },
              ],
              directives: [],
              selectionSet: {
                kind: "SelectionSet",
                selections: [
                  {
                    kind: "Field",
                    name: {
                      kind: "Name",
                      value: "id",
                    },
                    arguments: [],
                    directives: [],
                  },
                  {
                    kind: "Field",
                    name: {
                      kind: "Name",
                      value: "__typename",
                    },
                    arguments: [],
                    directives: [],
                  },
                ],
              },
            },
          ],
        },
      },
    ],
    loc: {
      start: 0,
      end: 167,
      source: {
        name: "GraphQL request",
        locationOffset: {
          line: 1,
          column: 1,
        },
      },
    },
    id: "0c26700219ba38f6cdfe69b98378c43dcf822854af7df49dc560aa1259c00d5b",
  },
};

test("console", () => {
  //   const firstError = new Error("UseLazyQueryError");
  //   const secondError = new Error("UseLazyQueryError");
  expect(equal(first, second)).toBe(true);
});
