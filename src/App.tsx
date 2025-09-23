import { useReducer } from "react";

export default function App() {
  const [state, dispatch] = useReducer((a: number) => a + 1, 0);

  async function onClick() {
    console.log("Before clicked");
    // Wait 2 seconds
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve(void 0);

        dispatch();
      }, 1000)
    );
    console.log("After clicked");
  }
  return (
    <div>
      <h1>Hello World</h1>
      <button onClick={onClick}>Click me</button>
      <p>Clicked {state} times</p>
    </div>
  );
}
