import { AppProvider, Button, ButtonGroup } from "@shopify/polaris";
import { AddImageMajor } from "@shopify/polaris-icons";
import "@shopify/polaris/build/esm/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import enTranslations from "@shopify/polaris/locales/en.json";

const App = () => (
  <AppProvider i18n={enTranslations}>
    <ButtonGroup gap="loose" fullWidth>
      <Button
        size="medium"
        textAlign="center"
        icon={AddImageMajor}
        tone="success"
        variant="primary"
      />
      <Button
        size="medium"
        textAlign="center"
        tone="critical"
        variant="primary"
      />
    </ButtonGroup>
  </AppProvider>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
