import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";

import App from "./App";

const rootElement = document.getElementById("root") as HTMLElement;

const root = ReactDOM.createRoot(rootElement);

root.render(
  <ErrorBoundary
    onError={(...args) => {
      console.log(args);
    }}
    fallback={<div>Error 😅</div>}
  >
    <h1>Hello</h1>
    <App />
  </ErrorBoundary>
);
