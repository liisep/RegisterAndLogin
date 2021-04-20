import { render, screen, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import Login from "../../pages/Login";

describe("Login page:", () => {
  beforeEach(() => {
    const history = createMemoryHistory();
    
    render(
      <Router history={history}>
        <Login setAuth={jest.fn} />
      </Router>
    )
  });

  it("return empty values, if inputs are not filled", () => {
    expect(screen.getByTestId("email")).toHaveValue("");
    expect(screen.getByTestId("password")).toHaveValue("");
  });

  it("return error message, if email is not correct format", () => {
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "liina@test" }
    });
    expect(screen.getByTestId("email-err")).toHaveTextContent("Invalid email format!");
  });

  it("return error message, if password is not correct format", () => {
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "12345" }
    });
    expect(screen.getByTestId("password-err")).toHaveTextContent("Password must contain at least 7 characters!");
  });

  it("return error message, if email is empty", () => {
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "" }
    });
    expect(screen.getByTestId("email-err")).toHaveTextContent("Email field is required!");
  });

  it("return error message, if password is empty", () => {
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "" }
    });
    expect(screen.getByTestId("password-err")).toHaveTextContent("Password field is required!");
  });

  it("return empty string, if email is correct format", () => {
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "liina@test.net" }
    });
    expect(screen.getByTestId("email-err")).toHaveTextContent("");
  });

  it("return empty string, if password is correct format", () => {
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "1234567" }
    });
    expect(screen.getByTestId("password-err")).toHaveTextContent("");
  });

  describe("Login button :", () => {
    it("is disabled, if email format is correct and password is not", () => {
      fireEvent.change(screen.getByPlaceholderText("Email"), {
        target: { value: "liina@test.net" }
      });
      fireEvent.change(screen.getByPlaceholderText("Password"), {
        target: { value: "12345" }
      });
      expect(screen.getByTestId("login-submit")).toHaveClass("btn custom-btn disabled");
    });

    it("is disabled, if password format is correct and email is not", () => {
      fireEvent.change(screen.getByPlaceholderText("Email"), {
        target: { value: "liina@test" }
      });
      fireEvent.change(screen.getByPlaceholderText("Password"), {
        target: { value: "1234567" }
      });
      expect(screen.getByTestId("login-submit")).toHaveClass("btn custom-btn disabled");
    });

    it("is disabled, if email and password format is not correct", () => {
      fireEvent.change(screen.getByPlaceholderText("Email"), {
        target: { value: "liina@test" }
      });
      fireEvent.change(screen.getByPlaceholderText("Password"), {
        target: { value: "12345" }
      });
      expect(screen.getByTestId("login-submit")).toHaveClass("btn custom-btn disabled");
    });

    it("is enabled, if email and password format is correct", () => {
      fireEvent.change(screen.getByPlaceholderText("Email"), {
        target: { value: "liina@test.net" }
      });
      fireEvent.change(screen.getByPlaceholderText("Password"), {
        target: { value: "123456" }
      });
      expect(screen.getByTestId("login-submit")).toHaveClass("btn custom-btn");
    });
  })
});

it("Login page registration link should redirect to registration url", () => {
  const history = createMemoryHistory();
  history.push = jest.fn();

  render(
    <Router history={history}>
      <Login setAuth={jest.fn} />
    </Router>
  );

  fireEvent.click(screen.getByTestId("register-link"));
  expect(history.push).toHaveBeenCalledWith("/register");
});