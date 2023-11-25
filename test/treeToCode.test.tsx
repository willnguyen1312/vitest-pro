import { describe, it } from "vitest";

import fs from "fs";
import parserBabel from "prettier/plugins/babel";
import * as prettierPluginEstree from "prettier/plugins/estree";
import * as prettier from "prettier/standalone";

import state from "./state1.json" assert { type: "json" };
// import state from "./state2.json" assert { type: "json" };

type RenderedComponent = {
  id: string;
  children: RenderedComponent[];
  componentName: string;
  props: any;
};

function traverse(
  node: RenderedComponent,
  visit: (node: RenderedComponent) => void,
) {
  visit(node);
  node.children.forEach((child) => traverse(child, visit));
}

describe("treeToCode", () => {
  it("should work", async () => {
    const tree: RenderedComponent[] = state.renderedComponents;

    const importedComponents = new Set<string>();
    const importedIcons = new Set<string>();

    tree.forEach((item) => {
      traverse(item, (node) => {
        importedComponents.add(node.componentName);

        if (node.props.icon) {
          importedIcons.add(node.props.icon);
        }
      });
    });

    function normalizePropValue(value: any, key = "") {
      if (typeof value === "string") {
        if (key === "icon") {
          return `{${value}}`;
        }
        return `"${value}"`;
      }

      if (typeof value === "number") {
        return `{${value}}`;
      }

      if (typeof value === "boolean") {
        return `${value}`;
      }

      if (Array.isArray(value)) {
        return value.length ? JSON.stringify(value) : "";
      }

      if (typeof value === "object") {
        let result = "{";

        Object.keys(value).forEach((key) => {
          if (value[key]) {
            result += `${key}:${normalizePropValue(value[key])},`;
          }
        });

        return result.slice(0, -1) + "}";
      }
    }

    function buildComponentProps(props: RenderedComponent["props"]) {
      let result = "";

      if (props) {
        const keys = Object.keys(props);

        keys.forEach((key) => {
          const value = props[key];

          if (key === "children") {
            return;
          }

          if (typeof value === "string" && value) {
            result += `${key}=${normalizePropValue(value, key)} `;
          } else if (typeof value === "number") {
            result += `${key}=${normalizePropValue(value)} `;
          } else if (typeof value === "boolean" && value) {
            result += `${key} `;
          } else if (typeof value === "object" && Object.keys(value).length) {
            if (Array.isArray(value)) {
              result += `${key}={${normalizePropValue(value)}} `;
            } else {
              result += `${key}={${normalizePropValue(value)}} `;
            }
          }
        });
      }

      return result;
    }

    function buildComponentToJsx(node: RenderedComponent) {
      let result = `<${node.componentName} `;

      if (node.props) {
        result += buildComponentProps(node.props);
      }

      if (node.children.length === 0) {
        return result + "/>";
      }

      result += ">";

      node.children.forEach((child) => {
        result += buildComponentToJsx(child);
      });

      return result + `</${node.componentName}>`;
    }

    const code = tree.reduce((acc, item) => {
      acc += buildComponentToJsx(item);
      return acc;
    }, "");

    const result = `
    import {AppProvider,${[...importedComponents]
      .sort()
      .join(",")}} from '@shopify/polaris'; ${
      [...importedIcons].length
        ? `import { ${[...importedIcons]
            .sort()
            .join(",")} } from "@shopify/polaris-icons";`
        : ""
    }
    import "@shopify/polaris/build/esm/styles.css";
    import React from "react";
    import ReactDOM from "react-dom/client";
    import enTranslations from "@shopify/polaris/locales/en.json";



    const App = () => (
      <AppProvider i18n={enTranslations}>
        ${code}
      </AppProvider>
    );

    ReactDOM.createRoot(document.getElementById("root")).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
    `;

    const formatted = await prettier.format(result, {
      parser: "babel-ts",
      // @ts-ignore
      plugins: [parserBabel, prettierPluginEstree],
      semi: true,
    });

    fs.writeFileSync("./test.tsx", formatted);
  });
});
