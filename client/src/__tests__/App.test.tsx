import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history"
import { Router } from "react-router-dom"
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";

it("render App view", () => {
  render(<App />);
  expect(screen.getByTestId("app")).toHaveClass("app content-center");
});

it("render Login view", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Login setAuth={jest.fn} />
    </Router>
  )
  expect(screen.getByTestId("login-title")).toHaveTextContent("Login");
});

it("render Register view", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Register setAuth={jest.fn} />
    </Router>
  )
  expect(screen.getByTestId("register-title")).toHaveTextContent("Register");
});

it("render Dashboard view", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Dashboard setAuth={jest.fn} />
    </Router>
  )
  expect(screen.getByTestId("dashboard-title")).toBeInTheDocument();
})
