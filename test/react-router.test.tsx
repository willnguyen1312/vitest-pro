import { render as rtlRender, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Link,
  Outlet,
  RouterProvider,
  createMemoryRouter,
  useLocation,
} from "react-router-dom";

const About = () => <div>You are on the about page</div>;
const Home = () => <div>You are home</div>;
const NoMatch = () => <div>No match</div>;

const LocationDisplay = () => {
  const location = useLocation();

  return <p>{location.pathname}</p>;
};

const Layout = () => {
  return (
    <div>
      <Link to="/">Home</Link>

      <Link to="/about">About</Link>

      <Outlet />

      <LocationDisplay />
    </div>
  );
};

const render = (options: Parameters<typeof createMemoryRouter>[1] = {}) => {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: <Layout />,
        children: [
          { index: true, element: <Home /> },
          {
            path: "about",
            element: <About />,
          },
          {
            path: "*",
            element: <NoMatch />,
          },
        ],
      },
    ],
    options,
  );

  return rtlRender(<RouterProvider router={router} />);
};

test("full app rendering/navigating", async () => {
  render();

  expect(screen.getByText(/you are home/i)).toBeInTheDocument();

  await userEvent.click(screen.getByText(/about/i));

  expect(screen.getByText(/you are on the about page/i)).toBeInTheDocument();
});

test("landing on a bad page", () => {
  render({ initialEntries: ["/something-that-does-not-match"] });

  expect(screen.getByText(/no match/i)).toBeInTheDocument();
});

test("rendering a component that uses useLocation", () => {
  const route = "/some-route";
  render({
    initialEntries: [route],
  });

  screen.debug();

  expect(screen.getByText(route)).toBeInTheDocument();
});
