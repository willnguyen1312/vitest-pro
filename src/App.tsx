import { useReducer } from "react";

export default function App() {
  const [state, dispatch] = useReducer((a: number) => a + 1, 0);
  return (
    <div>
      <h1>Hello World</h1>
      <button onClick={() => dispatch()}>Click me</button>
    </div>
  );
}
