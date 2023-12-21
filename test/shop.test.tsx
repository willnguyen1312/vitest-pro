import { AppProvider, Button, Text } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import { mount } from "@shopify/react-testing";
import "@shopify/react-testing/matchers";
import { useState } from "react";

// Mock window.matchMedia
// @ts-ignore
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

const App = () => {
  const [counter, setCounter] = useState(0);

  return (
    <AppProvider i18n={enTranslations}>
      <Text as="p">{counter}</Text>
      <Button onClick={() => setCounter(counter + 1)}>Example button</Button>
    </AppProvider>
  );
};

describe.only("Sample component", () => {
  it("should render", () => {
    const wrapper = mount(<App />);

    wrapper
      .find(Button, {
        children: "Example button",
      })
      .trigger("onClick");

    expect(wrapper).toContainReactComponentTimes(Text, 1, {
      children: 1,
    });
  });
});
