import { render, screen, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history"
import { Router } from "react-router-dom"
import Register from "../../pages/Register";

describe("Register page:", () => {
  beforeEach(() => {
    const history = createMemoryHistory();
    
    render(
      <Router history={history}>
        <Register setAuth={jest.fn} />
      </Router>
    )
  });

  it("return empty values, if inputs are not filled", () => {
    expect(screen.getByTestId("firstName")).toHaveValue("");
    expect(screen.getByTestId("lastName")).toHaveValue("");
    expect(screen.getByTestId("email")).toHaveValue("");
    expect(screen.getByTestId("password")).toHaveValue("");
  });

  it("return error message, if first name is not correct format", () => {
    fireEvent.change(screen.getByPlaceholderText("First name"), {
      target: { value: "l" }
    });
    expect(screen.getByTestId("first-name-err")).toHaveTextContent("First name must contain at least 2 characters!");
  });

  it("return error message, if last name is not correct format", () => {
    fireEvent.change(screen.getByPlaceholderText("Last name"), {
      target: { value: "l" }
    });
    expect(screen.getByTestId("last-name-err")).toHaveTextContent("Last name must contain at least 2 characters!");
  });

  it("return error message, if first name is empty", () => {
    fireEvent.change(screen.getByPlaceholderText("First name"), {
      target: { value: "" }
    });
    expect(screen.getByTestId("first-name-err")).toHaveTextContent("First name field is required!");
  });

  it("return error message, if last name is empty", () => {
    fireEvent.change(screen.getByPlaceholderText("Last name"), {
      target: { value: "" }
    });
    expect(screen.getByTestId("last-name-err")).toHaveTextContent("Last name field is required!");
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

  it("return empty string, if first name is correct format", () => {
    fireEvent.change(screen.getByPlaceholderText("First name"), {
      target: { value: "Li" }
    });
    expect(screen.getByTestId("first-name-err")).toHaveTextContent("");
  });

  it("return empty string, if last name is correct format", () => {
    fireEvent.change(screen.getByPlaceholderText("Last name"), {
      target: { value: "Uba" }
    });
    expect(screen.getByTestId("last-name-err")).toHaveTextContent("");
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

  describe("Register button :", () => {
    it("is disabled, if password field is not correct format, but other fields are correct", () => {
      fireEvent.change(screen.getByPlaceholderText("First name"), {
        target: { value: "Liina" }
      });
      fireEvent.change(screen.getByPlaceholderText("Last name"), {
        target: { value: "Pokk" }
      });
      fireEvent.change(screen.getByPlaceholderText("Email"), {
        target: { value: "liina@test.com" }
      });
      fireEvent.change(screen.getByPlaceholderText("Password"), {
        target: { value: "12345" }
      });
      expect(screen.getByTestId("register-submit")).toHaveClass("btn custom-btn disabled");
    });

    it("is enabled, if all fields formats are correct", () => {
      fireEvent.change(screen.getByPlaceholderText("First name"), {
        target: { value: "Liina" }
      });
      fireEvent.change(screen.getByPlaceholderText("Last name"), {
        target: { value: "Test" }
      });
      fireEvent.change(screen.getByPlaceholderText("Email"), {
        target: { value: "liina@test.com" }
      });
      fireEvent.change(screen.getByPlaceholderText("Password"), {
        target: { value: "1234567" }
      });
      expect(screen.getByTestId("register-submit")).toHaveClass("btn custom-btn");
    });
  });
});

it("Register page login link should redirect to login url", () => {
  const history = createMemoryHistory();
  history.push = jest.fn();

  render(
    <Router history={history}>
      <Register setAuth={jest.fn} />
    </Router>
  );

  fireEvent.click(screen.getByTestId("login-link"));
  expect(history.push).toHaveBeenCalledWith("/login");
});