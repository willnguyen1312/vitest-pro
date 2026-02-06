import { render, screen } from "@testing-library/react";
import { useCallback, useEffect, useState } from "react";
import userEvent from "@testing-library/user-event";

const App = () => {
  const [state, setState] = useState<number[]>([]);

  console.log("App rendering...", state);
  const data = state.filter((item) => item % 2 === 0);

  const callBack = useCallback(() => {
    console.log("callBack calling...", data);
  }, [data]);

  useEffect(() => {
    callBack();
  }, [callBack]);

  return <main>
    <h1>Hello World</h1>
    <p>Data: {data.join(", ")}</p>
    <button onClick={() => setState(state.concat([state.length]))}>Add</button>
  </main>
};

it("should work great", async () => {
  const user = userEvent.setup();

  const { rerender } = render(<App />);


  const button = screen.getByRole("button");
  await user.click(button);

  rerender(<App />);
  // expect(screen.getByText("Data: 0")).toBeInTheDocument();

});
